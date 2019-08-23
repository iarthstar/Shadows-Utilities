module Main 
  ( copyOrCutShadows
  , pasteOrRemoveShadows
  ) where

import Prelude

import Data.Array (length, (!!))
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Traversable (traverse_)
import Effect (Effect)
import Foreign.Class (class Encode)
import Optic.Getter ((^.))
import Optic.Lens (lens)
import Optic.Types (Lens')
import Sketch.Dom as Dom
import Sketch.Settings as Settings
import Sketch.Types (Layer(..), Shadow)
import Sketch.UI as UI

copyOrCutShadows :: String -> Effect Unit
copyOrCutShadows action = Dom.selectedLayers >>= case _ of
    Left err -> UI.message "Something went wrong..."
    Right layers -> case layers !! 0, length layers of
        _                 , 0 -> UI.alert "No Selection" "Please select a layer and try again..."
        Just (Shape layer), 1 -> performAction layer
        Just (Text layer) , 1 -> performAction layer
        Just (Image layer), 1 -> performAction layer
        Just (Group layer), 1 -> performAction layer
        _                 , 1 -> UI.message "Sketch doesn't support Shadows on selected layer"
        _                 , _ -> UI.alert "More than one layer selected" "Please select only one layer and try again..."
  where
    performAction :: forall a b c d e. Encode e => Newtype a {style :: b, id :: String | c} => Newtype b { shadows :: Maybe e | d} => a -> Effect Unit
    performAction layer = case layer ^. _style ^. _shadows of
        Nothing -> pure unit
        Just shadows -> do
          Settings.setGlobalSettingForKey "copied-shadows" shadows
          case action of
            "CUT" -> Dom.setPropsForLayerID (layer ^. _id) ["style", "shadows"] ([] :: Array Shadow)
            _ -> pure unit

pasteOrRemoveShadows :: String -> Effect Unit
pasteOrRemoveShadows action = Dom.selectedLayers >>= case _ of
    Left err -> UI.message "Something went wrong..."
    Right layers  -> case length layers of
        0 -> UI.alert "No Selection" "Please select a layer and try again..."
        _ -> case action of
            "REMOVE" -> traverse_ (\l -> Dom.setPropsForLayerID (getLayerId l) ["style", "shadows"]  ([] :: Array Shadow)) layers
            "PASTE" -> Settings.globalSettingForKey "copied-shadows" >>= case _ of
                Left err -> UI.message "Something went wrong..."
                Right (shadows :: Array Shadow) -> traverse_ (\l -> Dom.setPropsForLayerID (getLayerId l) ["style", "shadows"] shadows) layers
            _ -> pure unit
  where
    getLayerId :: Layer -> String
    getLayerId layer = case layer of
        Text tl -> tl ^. _id
        Image il -> il ^. _id
        Shape sl -> sl ^. _id
        Group gl -> gl ^. _id
        Artboard al -> al ^. _id

-- | Accessors 
_shapeType :: forall a b c. Newtype a { shapeType :: b | c } => Lens' a b
_shapeType = lens (unwrap >>> _.shapeType) (\oldRec newVal -> wrap ((unwrap oldRec) { shapeType = newVal }))

_style :: forall a b c. Newtype a { style :: b | c } => Lens' a b
_style = lens (unwrap >>> _.style) (\oldRec newVal -> wrap ((unwrap oldRec) { style = newVal }))

_shadows :: forall a b c. Newtype a { shadows :: b | c } => Lens' a b
_shadows = lens (unwrap >>> _.shadows) (\oldRec newVal -> wrap ((unwrap oldRec) { shadows = newVal }))

_id :: forall a b c. Newtype a { id :: b | c } => Lens' a b
_id = lens (unwrap >>> _.id) (\oldRec newVal -> wrap ((unwrap oldRec) { id = newVal }))

module Main ( performAction ) where

import Prelude

import Data.Array (length, (!!))
import Data.Either (Either(..), either)
import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (class Newtype, unwrap, wrap)
import Effect (Effect)
import Optic.Getter ((^.))
import Optic.Lens (lens)
import Optic.Types (Lens')
import Sketch.Dom as Dom
import Sketch.Settings as Settings
import Sketch.Types (Layer(..), Shadow)
import Sketch.UI as UI

performAction :: String -> Effect Unit
performAction action = Dom.selectedLayers >>= case _ of
    Left err      -> UI.message "Something went wrong..."
    Right layers  -> case length layers, layers !! 0, action of
        0, _                , _         -> UI.alert "No Selection" "Please select a layer and try again..."
        1, Just (Artboard l), _         -> UI.message "Sketch doesn't support Shadows on selected layer"
        1, Just layer       , "COPY"    -> Settings.setGlobalSettingForKey "Shadows-Utilities.copied-shadows" $ getShadows layer
        1, Just layer       , "CUT"     -> (Settings.setGlobalSettingForKey "Shadows-Utilities.copied-shadows" <<< getShadows *> setShadows ([] :: Array Shadow)) layer
        _, _                , "PASTE"   -> either (\_ -> UI.message "Something went wrong...") (\s -> traverse_ (setShadows s) layers) =<< Settings.globalSettingForKey "Shadows-Utilities.copied-shadows"
        _, _                , "DELETE"  -> traverse_ (setShadows ([] :: Array Shadow)) layers
        _, _                , "COPY"    -> UI.alert "More than one layer selected" "Please select only one layer and try again..."
        _, _                , "CUT"     -> UI.alert "More than one layer selected" "Please select only one layer and try again..."
        _, _                , _         -> pure unit

getLayerId :: Layer -> String
getLayerId = case _ of
    Text     l -> l ^. _id
    Image    l -> l ^. _id
    Shape    l -> l ^. _id
    Group    l -> l ^. _id
    Artboard l -> l ^. _id

getShadows :: Layer -> Array Shadow
getShadows = fromMaybe [] <<< case _ of
        Text     l -> l ^. _style ^. _shadows
        Image    l -> l ^. _style ^. _shadows
        Shape    l -> l ^. _style ^. _shadows
        Group    l -> l ^. _style ^. _shadows
        Artboard l -> Just []

setShadows :: Array Shadow -> Layer -> Effect Unit
setShadows s l = Dom.setPropsForLayerID (getLayerId l) ["style", "shadows"] s

_style :: forall a b c. Newtype a { style :: b | c } => Lens' a b
_style = lens (unwrap >>> _.style) (\oldRec newVal -> wrap ((unwrap oldRec) { style = newVal }))

_shadows :: forall a b c. Newtype a { shadows :: b | c } => Lens' a b
_shadows = lens (unwrap >>> _.shadows) (\oldRec newVal -> wrap ((unwrap oldRec) { shadows = newVal }))

_id :: forall a b c. Newtype a { id :: b | c } => Lens' a b
_id = lens (unwrap >>> _.id) (\oldRec newVal -> wrap ((unwrap oldRec) { id = newVal }))
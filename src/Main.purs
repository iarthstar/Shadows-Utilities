module Main ( performAction ) where

import Prelude

import Data.Array (length, (!!))
import Data.Either (Either(..))
import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (unwrap)
import Effect (Effect)
import Sketch.Dom as Dom
import Sketch.Settings as Settings
import Sketch.Types (ArtboardLayer(..), GroupLayer(..), ImageLayer(..), Layer(..), Shadow, ShapeLayer(..), TextLayer(..))
import Sketch.UI as UI

performAction :: String -> Effect Unit
performAction action = Dom.selectedLayers >>= case _ of
    Left err      -> UI.message "Something went wrong..."
    Right layers  -> case length layers, layers !! 0, action of
        0, _                , _        -> UI.alert "No Selection" "Please select a layer and try again..."
        1, Just (Artboard l), _        -> UI.message "Sketch doesn't support Shadows on selected layer"
        1, Just layer       , "COPY"   -> Settings.setGlobalSettingForKey "Shadows-Utilities.copied-shadows" (getShadows layer)
        1, Just layer       , "CUT"    -> Settings.setGlobalSettingForKey "Shadows-Utilities.copied-shadows" (getShadows layer) *> 
                                          setShadows ([] :: Array Shadow) layer
        _, _                , "PASTE"  -> Settings.globalSettingForKey "Shadows-Utilities.copied-shadows" >>= case _ of
                                            Left  _ -> UI.message "Something went wrong..."
                                            Right s -> traverse_ (setShadows s) layers
        _, _                , "DELETE" -> traverse_ (setShadows ([] :: Array Shadow)) layers
        _, _                , "COPY"   -> UI.alert "More than one layer selected" "Please select only one layer and try again..."
        _, _                , "CUT"    -> UI.alert "More than one layer selected" "Please select only one layer and try again..."
        _, _                , _        -> pure unit

getID :: Layer -> String
getID (Text     (TextLayer     l)) = l.id
getID (Image    (ImageLayer    l)) = l.id
getID (Group    (GroupLayer    l)) = l.id
getID (Shape    (ShapeLayer    l)) = l.id
getID (Artboard (ArtboardLayer l)) = l.id

getShadows :: Layer -> Array Shadow
getShadows (Text     (TextLayer     l)) = fromMaybe [] (unwrap l.style).shadows
getShadows (Image    (ImageLayer    l)) = fromMaybe [] (unwrap l.style).shadows
getShadows (Group    (GroupLayer    l)) = fromMaybe [] (unwrap l.style).shadows
getShadows (Shape    (ShapeLayer    l)) = fromMaybe [] (unwrap l.style).shadows
getShadows (Artboard (ArtboardLayer l)) = []

setShadows :: Array Shadow -> Layer -> Effect Unit
setShadows s l = Dom.setPropsForLayerID (getID l) ["style", "shadows"] s
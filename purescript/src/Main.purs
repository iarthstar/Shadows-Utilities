module Main where

import Prelude (Unit, bind, discard, pure, unit, ($), (<$>), (>>=))

import Control.Monad.Except (runExcept)
import Data.Array (head, length)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Foreign (F, Foreign)
import Foreign.Class (decode, encode)
import Sketch.Dom as Dom
import Sketch.Settings as Settings
import Sketch.Types (ArtboardLayer(..), GroupLayer(..), ImageLayer(..), Layer(..), Shadow, ShapeLayer(..), ShapeStyle(..), TextLayer(..))
import Sketch.UI as UI

foreign import setShadowsForLayerID :: String -> Foreign -> Effect Unit

copyShadows :: Effect Unit
copyShadows = do
  Dom.selectedLayers >>= case _ of
    Left err -> UI.message "Something went wrong..."
    Right layers -> do
      case length layers of
        0 -> UI.alert "No Selection" "Please select a layer and try again..."
        1 -> do
          case head layers of
            Nothing -> UI.message "Something went wrong..."
            Just (Shape (ShapeLayer sl)) -> do
              case sl.shapeType of
                "Rectangle" -> do
                  let (ShapeStyle style) = sl.style
                  case style.shadows of
                    Nothing -> pure unit
                    Just shadows -> do
                      Settings.setGlobalSettingForKey "copied-shadows" $ encode shadows
                      UI.message "Shadow copied..."
                _ -> pure unit
            _ -> pure unit
        _ -> UI.alert "More than one layer selected" "Please select only one layer and try again..."
    
pasteShadows :: Effect Unit
pasteShadows = do
  selection <- Dom.selectedLayers
  fetchedShadows <- fetchShadows
  case selection, fetchedShadows of
    Left _, Left _-> UI.message "Something went wrong..."
    Right layers, Right shadows -> do
      case length layers of
        0 -> UI.alert "No Selection" "Please select a layer and try again..."
        _ -> do
          _ <- traverse (applyShadow shadows) layers
          UI.message "Shadows pasted..."
    _, _ -> UI.message "Something went wrong..."
  
  where
    fetchShadows :: Effect (Either String (Array Shadow))
    fetchShadows = do
      (shadowsF :: F (Array Shadow)) <- decode <$> Settings.globalSettingForKey "copied-shadows" 
      pure $ case runExcept shadowsF of
        Left err -> Left "Error Fetching Shadows"  
        Right shadows -> Right shadows

    applyShadow :: Array Shadow -> Layer -> Effect Unit
    applyShadow shadows layer = do
      let id = case layer of
            Text (TextLayer tl) -> tl.id
            Image (ImageLayer il) -> il.id
            Shape (ShapeLayer sl) -> sl.id
            Group (GroupLayer gl) -> gl.id
            Artboard (ArtboardLayer al) -> al.id
      setShadowsForLayerID id (encode shadows)
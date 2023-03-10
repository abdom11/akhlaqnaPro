import React, { useCallback, useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import languages from "../strings/LanguagesController";

export default function SeeMoreText(props) {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [isAr, setIsAr] = useState(true);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
    if (languages.langType() === "En") {
      setIsAr(false);
    } else {
      setIsAr(true);
    }
  });

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > props.numberOfLines); //to check the text is more than 4 lines or not
  }, []);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);

    if (props.hasOwnProperty("onPress") == true) {
      props.onPress();
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(props.text);
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={toggleNumberOfLines}
      onLongPress={copyToClipboard}
    >
      <Text
        style={props.textStyle}
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : props.numberOfLines}
      >
        {props.text}
      </Text>

      {lengthMore && !textShown ? (
        <TouchableOpacity onPress={toggleNumberOfLines}>
          <Text
            style={[props.textStyle, { fontWeight: "bold" }]}
          >
            {currLang.postcard.readmore}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

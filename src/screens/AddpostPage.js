import React, { useState, useEffect } from "react";
import {
  I18nManager,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import users from "../data/users";

import Adding from "../../API/Adding";
import languages from "../strings/LanguagesController";

const isRTL = I18nManager.isRTL;

const AddPostPage = ({ navigation }) => {
  const user = users[0];

  const [content, setContent] = useState("fake content");
  const [image, setImage] = useState("null image");
  const [createdDateTime, setcreatedDateTime] = useState(Date.now());

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const onPost = () => {
    // let data = new FormData();
    // data.append("userId", user.id);
    // data.append("content", content);
    // data.append("createdDateTime", createdDateTime);
    // data.append("image", {
    //   uri: "http://ryzentx.online/image_1.png",
    //   name: "profileExample.png",
    //   type: "image/png",
    // });

    // Adding("addPost", data, () => navigation.navigate("Post"));

    console.log("toto");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <View style={styles.avatarContainer}>
          <UserAvatar size={55} src={user.profileImage} fontSize={20} />
        </View>
        <View style={styles.headerDetailsContainer}>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <TextInput
            style={styles.contentInput}
            placeholder={currLang.addpostPage.hint}
            multiline={true}
            onChangeText={(text) => {
              setContent(text);
            }}
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.attachmentContainer}>
          <TouchableOpacity style={styles.actionBtnContainer}>
            <FontAwesome name={"camera"} size={30} color={"#660032"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnContainer}>
            <MaterialIcons
              name={"add-photo-alternate"}
              size={40}
              color={"#660032"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnContainer}>
            <Entypo name={"location"} size={30} color={"#660032"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.postBtnContaianer} onPress={onPost}>
          <Text style={styles.postText}>{currLang.addpostPage.post}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  headContainer: {
    flex: 1,
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
  },

  headerDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#660032",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
  },

  content: {
    padding: 10,
  },

  contentInput: {
    // height: "100%",
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: 'auto',
  },

  actionsContainer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  attachmentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  postBtnContaianer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "#660032",
  },
  attachmentsContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },

  postContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "flex-end",

    paddingRight: 50,
  },
  postText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddPostPage;

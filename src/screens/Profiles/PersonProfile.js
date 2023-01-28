import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  I18nManager,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import posts from "../../data/posts";
import PostCard from "../../screens/post/PostCard";
import languages from "../../strings/LanguagesController";
import AppHeader from "../../components/AppHeader";
import users from "../../data/users";

import { useNavigation } from '@react-navigation/native';
import CommentPage from "../comment/CommentPage";

const isRTL = I18nManager.isRTL;

export default function PersonProfile({ navigation, route }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);

  const ourUser = route.params?.user;
  const isDrawer = route.params?.isDrawer;
  const globleNavigation = useNavigation();

  const isUserMe = ourUser.id === "u1" ? true : false;
  let x = [];

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].user.id === ourUser.id) {
      x.push(posts[i]);
      x.push(posts[i]);
      x.push(posts[i]);
    }
  }

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const onEdit = () => {
    Alert.alert(
      currLang.languagepage.applychangealert.title,
      currLang.languagepage.applychangealert.content,
      [
        {
          text: currLang.languagepage.applychangealert.buttons.yessingout,
          onPress: () => {
            globleNavigation.dispatch(
              globleNavigation.reset({
                index: 0,
                routes: [{ name: "SignUpPage", params: {user: users[0]} }],
              })
              // navigation.navigate({ name: "SignUpPage", params: {user: users[0]} })
            );
          },
        },
        {
          text: currLang.languagepage.applychangealert.buttons.cancel,
          onPress: null,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} isDrawer={isDrawer} />

      <FlatList
        style={styles.postsContainer}
        ListHeaderComponent={
          <View style={headerStyles.headContaienr}>
            <View style={headerStyles.head}>
              <View style={headerStyles.profileContainer}>
                <View style={styles.imageContainer}>
                  <UserAvatar
                    src={ourUser.profileImage}
                    userName={"Jhon"}
                    size={80}
                  />
                </View>
                <View style={headerStyles.detailsContaienr}>
                  <Text style={headerStyles.name}>{ourUser.name}</Text>
                  {/* <MaterialCommunityIcons
                    name={"dots-vertical"}
                    color={"#660032"}
                    size={50}
                  /> */}
                </View>
              </View>
              <View style={headerStyles.actionContaienr}>
                {!isUserMe ? (
                  <>
                    <TouchableOpacity style={headerStyles.btnStyle}>
                      <View style={headerStyles.messageButton}>
                        <Text style={headerStyles.messageText}>Message</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={headerStyles.btnStyle}>
                      <View style={headerStyles.lostAndFoundButton}>
                        <Text style={headerStyles.lostAndFoundText}>
                          Lost & Found
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={headerStyles.myBtnStyle}
                    onPress={onEdit}
                  >
                    <View style={headerStyles.editProfileButton}>
                      <Text style={headerStyles.editProfileText}>
                        Edit Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        }
        data={x}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => {
          return (
            <PostCard
              navigation={navigation}
              post={item.item}
              key={index}
              onPressComment={(clickedPost) => {
                setCommentPost(clickedPost);
                setIsCommentOpen(true);
                console.log("Comment Pressed: " + clickedPost.commentsId);
              }}
            />
          );
        }}
      />
      {!isCommentOpen ? console.log("Comment Clsoed: PostsPage") : null}
      {isCommentOpen && (
        <CommentPage
          post={commentPost}
          isClosed={(state) => {
            setIsCommentOpen(state);
          }}
        />
      )}
    </View>
  );
}

const headerStyles = StyleSheet.create({
  headContaienr: {
    flex: 1,
    maxHeight: 170,
    minHeight: 170,
    backgroundColor: "white",
  },
  head: {
    flex: 4,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#660032",
  },
  profileContainer: {
    flex: 5,
    flexDirection: "row",
    // backgroundColor:'red'
  },
  detailsContaienr: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  name: {
    fontSize: 24,
    color: "#660032",
    marginTop: 10,
  },

  actionContaienr: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnStyle: {
    flex: 1,
    maxWidth: 170,
    minWidth: 170,
  },
  myBtnStyle: {
    flex: 1,
    maxWidth: 170,
    minWidth: 170,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 99,
    borderWidth: 1,
    maxHeight: 30,
    minHeight: 30,
    borderColor: "#660032",
    alignItems: "center",
    // paddingLeft: isRTL ? -20 : 10,
    paddingTop: 3,
  },
  editProfileText: {
    // marginLeft: 30,
    color: "#660032",
    fontSize: 16,
  },
  messageButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 99,
    borderWidth: 1,
    maxHeight: 40,
    minHeight: 40,
    borderColor: "#660032",
    alignItems: "center",
    // paddingLeft: isRTL ? -20 : 10,
    paddingTop: 5,
  },
  messageText: {
    // marginLeft: 30,
    color: "#660032",
    fontSize: 20,
  },
  lostAndFoundButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#660032",
    maxHeight: 40,
    alignItems: "center",
    paddingTop: 8,
  },
  lostAndFoundText: {
    // marginLeft: 30,
    color: "#660032",
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  iconImageBackContainer: {
    flex: 1,
    // backgroundColor: 'grey',
    maxWidth: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    // backgroundColor: 'green',
  },
  postsContainer: {
    flex: 4,
    paddingBottom: 10,
    // paddingTop: 5,
    backgroundColor: "#CCCCCC",
  },
});

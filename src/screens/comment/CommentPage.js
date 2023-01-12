import React, { useCallback, useMemo, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CommentCard from "./CommentCard";
import comments from "../../data/comments";
import InputBox from "../chat/inputBox";

function preperTempData() {
  let coments = [];

  for (let i = 0; i < comments.length * 5; i++) {
    coments.push(comments[i % comments.length]);
  }

  return coments;
}

export default function CommentPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.commentsContainer}>
        <FlatList
          data={preperTempData()}
          style={styles.scrollContainer}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return <CommentCard comment={item.item} key={index} />;
          }}
        />
      </View>

      <InputBox isComment={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 17,
    backgroundColor: "#F0F2F5",
  },

  commentsContainer: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },
});
import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CheckOTP from "../../API/CheckOTP";
import languages from "../strings/LanguagesController";

const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;
// const currLang = languages.currLang();

export default function SignUpConfirmation({ navigation, route }) {
  const [OTP, setOtp] = useState("999999");

  const isChangePass = route.params?.isChangePass;
  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const onChangePass = () => {
    navigation.navigate("ChangePasswordPage", {
      phoneNumber: route.params?.phoneNumber,
    });
  };

  const checkOTP = () => {
    navigation.navigate("Home");
    CheckOTP(
      {
        otp: OTP,
        phoneNumber: route.params?.phoneNumber,
      },
      () => navigation.navigate("Home")
    );
    return;
  };
  const onResend = () => {
    //fake OTP generator:
    otp = Math.floor(Math.random() * 1000000).toString();
    Alert.alert("OTP number", otp);
  };

  return (
    <View style={styles.background}>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={{
          flex: 1,
          minHeight: windowHeight,
          maxHeight: windowHeight,
        }}
      >
        <View style={styles.headContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image
                source={require("../../assets/Logo.png")}
                style={styles.imageLogo}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{currLang.otpPage.wesentotp}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder={"OTP"}
              placeholderTextColor={"#660032"}
              onChangeText={(text) => {
                setOtp(text);
              }}
              maxLength={6}
              style={{ width: "100%", textAlign: "center" }}
            />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.submitContainer}>
            <TouchableOpacity
              style={styles.submit}
              onPress={isChangePass ? onChangePass : checkOTP}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {currLang.otpPage.submit}
              </Text>
            </TouchableOpacity>
          </View>
          {!isChangePass && (
            <>
              <View style={styles.resendContainer}>
                <TouchableOpacity style={styles.resend} onPress={onResend}>
                  <Text style={{ color: "#660032", fontSize: 22 }}>
                    {currLang.otpPage.resendotp}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.changePhoneContainer}>
                <TouchableOpacity
                  style={styles.changePhone}
                  onPress={() => navigation.goBack()}
                >
                  <Text
                    style={{
                      color: "#660032",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {currLang.otpPage.changemyphone}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 10,
  },

  headContainer: {
    flex: 3,
    // backgroundColor: 'blue',
    marginTop: 90,
  },
  backContainer: {
    marginTop: 10,
    justifyContent: "center",
  },
  logoContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // backgroundColor: 'green',
  },
  logo: {
    height: 125,
    width: 125,
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 150 / 2,

    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    // alignSelf: 'center',
    height: 87,
    width: 57,

    // marginTop: 12,
    marginLeft: isRTL ? -5 : 5,
  },

  textContainer: {
    marginTop: "20%",
    alignSelf: "center",
    // backgroundColor: 'red',
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#660032",
  },

  inputContainer: {
    flex: 1,
    // backgroundColor: '#165815',
    justifyContent: "center",

    paddingHorizontal: 90,
  },
  input: {
    height: 47,
    // backgroundColor: 'red',

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 15,
    padding: 10,
  },

  actionsContainer: {
    flex: 4,
  },
  submitContainer: {
    marginTop: 7,
    justifyContent: "center",
    paddingHorizontal: 130,
  },
  submit: {
    height: 40,
    backgroundColor: "#660032",

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  resendContainer: {
    alignSelf: "center",
    marginTop: "30%",
    marginBottom: 10,
  },
  resend: {},
  changePhoneContainer: {
    alignSelf: "center",
  },
  changePhone: {},
});

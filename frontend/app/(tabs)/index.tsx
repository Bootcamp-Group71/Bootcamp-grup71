import React from "react";
import WelcomeScreen from "../WelcomeScreen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  TabOneScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "TabOneScreen">;

export default function TabOneScreen({ navigation }: Props) {
  return <WelcomeScreen navigation={navigation} />;
}

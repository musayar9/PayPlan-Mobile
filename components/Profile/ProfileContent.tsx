import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const profileLinks = [
  {
    id: 1,
    icon: "person",
    title: "Account Settings",
    href: "profile/editProfile",
  },
  {
    id: 2,
    icon: "notifications",
    title: "Notifications",
    href: "profile/notifications",
  },
  {
    id: 3,
    icon: "sunny",
    title: "Theme & Appearance",
    href: "profile/themeAppearance",
  },
  { id: 4, icon: "language", title: "Language", href: "profile/language" },
  {
    id: 5,
    icon: "help",
    title: "Help & Support",
    href: "profile/helpSupport",
  },
];

const ProfileContent = () => {
  return (
    <View style={styles.content}>
      <View style={styles.headContent}>
        <Text style={styles.headText}>Content</Text>
      </View>

      <View style={styles.profileLinkContent}>
        {profileLinks.map((link) => (
          <Link
            asChild
            key={link.id}
            href={link.href}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 12,
              borderBottomWidth: link.id !== profileLinks.length ? 1 : 0,
              borderBottomColor: Colors.lightGray,
            }}
          >
            <TouchableOpacity style={styles.linkBtn}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons name={link.icon} size={20} color={Colors.palette.textSecondary} />
                <Text>{link.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.palette.textSecondary}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </View>

    </View>
  );
};

export default ProfileContent;

const styles = StyleSheet.create({
  content: {
    marginVertical: 20,
  },

  headContent: {
    backgroundColor: Colors.palette.backgroundCard,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  headText: {
    color: Colors.palette.textSecondary,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  profileLinkContent: {
    backgroundColor: Colors.palette.backgroundCard,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginVertical: 10,
  },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
});

import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage =
    page === 1;

  const isLastPage =
    page === totalPages;

  return (
    <View
      style={
        styles.container
      }
    >
      <TouchableOpacity
        disabled={
          isFirstPage
        }
        activeOpacity={
          0.7
        }
        onPress={
          onPrevious
        }
        style={
          styles.buttonContainer
        }
      >
        <Text
          style={[
            styles.button,
            isFirstPage &&
              styles.disabled,
          ]}
        >
          ← Previous
        </Text>
      </TouchableOpacity>

      <Text
        style={
          styles.page
        }
      >
        Page {page} of{" "}
        {totalPages}
      </Text>

      <TouchableOpacity
        disabled={
          isLastPage
        }
        activeOpacity={
          0.7
        }
        onPress={
          onNext
        }
        style={
          styles.buttonContainer
        }
      >
        <Text
          style={[
            styles.button,
            isLastPage &&
              styles.disabled,
          ]}
        >
          Next →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor:
        "#E2E8F0",
    },

    buttonContainer: {
      minWidth: 90,
    },

    button: {
      color:
        "#2563EB",
      fontWeight:
        "600",
      fontSize: 15,
    },

    disabled: {
      opacity: 0.4,
    },

    page: {
      color:
        "#0F172A",
      fontWeight:
        "600",
      fontSize: 14,
    },
  });
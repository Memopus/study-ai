import { BottomSheetKeys, useBottomSheet } from "@/lib/store/bottom-sheets";
import {
  BottomSheetBackdrop,
  BottomSheetFooterProps,
  BottomSheetModal as BottomSheetModalView,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { FC, ReactNode, useCallback } from "react";
import { StyleSheet } from "react-native";

interface Props {
  id: BottomSheetKeys;
  snapPoint: number;
  scrollView?: boolean;
  children: ReactNode;
  func?: () => void;
  footerBtnText?: string;
  footer?: FC<BottomSheetFooterProps> | undefined;
}

const BottomSheetModal = ({
  id,
  snapPoint,
  scrollView = false,
  children,
}: Props) => {
  const ref = useBottomSheet(id);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheetModalView
      ref={ref}
      index={0}
      snapPoints={[snapPoint]}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableDynamicSizing={false}
      enableContentPanningGesture={true}
      stackBehavior="push"
    >
      {scrollView ? (
        <BottomSheetScrollView
          style={styles.modalContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView>{children}</BottomSheetView>
      )}
    </BottomSheetModalView>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    paddingBottom: 20,
  },

  bottomSheetBackground: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
  },

  handleIndicator: {
    backgroundColor: "#E5E7EB",
    width: 48,
    height: 5,
    borderRadius: 3,
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    letterSpacing: 0.3,
  },

  saveButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
});

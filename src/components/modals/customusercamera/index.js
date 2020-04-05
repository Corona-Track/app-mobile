import React, { useState } from "react";
import { Modal, View, Image, TouchableOpacity, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { RNCamera } from "react-native-camera";


export const CustomUserCamera = ({ isVisible, onChangePhoto, onCloseCamera }) => {
    const [camera, setCamera] = useState();

    const onTakePicture = async () => {
        try {
            const { base64 } = await camera.takePictureAsync({
                quality: 0.5,
                forceUpOrientation: true,
                fixOrientation: true,
                skipProcessing: true,
                base64: true
            });
            onChangePhoto(base64);
        } catch (error) {
            Alert.alert("Erro", "Houve um erro ao tirar a foto.");
        }
    };

    return (
        <Modal animationType="slide" transparent={false} visible={isVisible}>
            <RNCamera
                ref={ref => setCamera(ref)}
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: "Permissão para usar a câmera",
                    message: "Precisamos da sua permissão para usar a câmera.",
                    buttonPositive: "Ok",
                    buttonNegative: "Cancelar"
                }}
                captureAudio={false}>
                <Icon
                    name="photo-camera"
                    size={40}
                    color={"#fff"}
                    onPress={onTakePicture}
                    style={styles.buttonTakePicture}
                />
                <Icon
                    name="close"
                    size={32}
                    color={"#fff"}
                    onPress={onCloseCamera}
                    style={styles.buttonCloseCamera}
                />
            </RNCamera>
        </Modal>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f37272"
    },
    logo: {
        alignSelf: "center",
        marginTop: 60
    },
    photo: {
        width: 300,
        height: 200,
        backgroundColor: "#fff",
        alignSelf: "center",
        marginTop: 80
    },
    buttons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 150,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTakePicture: {
        flex: 0,
        alignSelf: "center",
        position: "absolute",
        bottom: 20
    },
    buttonCloseCamera: {
        flex: 0,
        position: "absolute",
        top: 35,
        right: 30
    }
});
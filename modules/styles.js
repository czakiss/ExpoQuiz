import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 40,
        alignItems: "center",
        flex: 1

    },
    view: {
        paddingHorizontal: 20,
        paddingBottom: 150
    },
    listItem: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 18,
        marginLeft: 20
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginRight: 3
    },
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    profileImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20
    },
    sidebarDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    }
});



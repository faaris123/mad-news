import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen"
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgerNewsArticleScreen from "../screens/BadgerNewsArticleScreen"

const Tab = createBottomTabNavigator();
const NewsStack = createNativeStackNavigator();

// Used the lecture code examples to figure out this part 
function NewsFeedStack() {
    return <>
        <NewsStack.Navigator>
            <NewsStack.Screen name="Articles" component={BadgerNewsScreen}/>
            <NewsStack.Screen name="Article" component={BadgerNewsArticleScreen}/>
        </NewsStack.Navigator>
    </>
}

function BadgerTabs(props) {
    return <>
        <Tab.Navigator screenOptions={{headerStyle: {backgroundColor: "lightblue"}}}>
            <Tab.Screen name="News" component={NewsFeedStack}/>
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen}/>
        </Tab.Navigator>
    </>
}

export default BadgerTabs;

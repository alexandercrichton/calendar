require.config({
    baseUrl: '/Scripts',
    paths: {
        react: "https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons",
        //'reactDom': 'react-dom',
        JSXTransformer: 'JSXTransformer',
        jsx: 'jsx',
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery",
        reflux: 'https://cdn.jsdelivr.net/refluxjs/0.2.11/reflux.min',
        fullcalendar: "https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.0/fullcalendar",
        moment: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment",

        Store: 'React/Stores/Store',
        Actions: 'React/Actions/Actions'
    },
    shim: {
        fullcalendar: {
            deps: ["jquery", "moment"]
        }
    },
    jsx: {
        fileExtension: '.jsx'
    }
});
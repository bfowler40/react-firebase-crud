import firebase from 'firebase';
var config = {
	apiKey: 'AIzaSyDkgeB4oWHu4ncD7fWMlX5AbCACeOsbNNA',
	authDomain: 'test-app-3d3cd.firebaseapp.com',
	databaseURL: 'https://test-app-3d3cd.firebaseio.com',
	projectId: 'test-app-3d3cd',
	storageBucket: 'test-app-3d3cd.appspot.com',
	messagingSenderId: '952332702395'
};
firebase.initializeApp(config);
export default firebase;

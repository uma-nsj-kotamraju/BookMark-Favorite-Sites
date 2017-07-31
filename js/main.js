//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save Bookmark
function saveBookmark(e) {
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	
	if(!validateForm(siteName,siteUrl)){
		return false;
	}


	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	
	
/*	//local storage test
	localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));

	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
*/
   
   //Test if bookmarks is null
   if(localStorage.getItem('bookmarks') === null){
   	  //Init array
   	  var bookmarks = [];
   	  //Add to array
   	  bookmarks.push(bookmark);
   	  //set to localstorage
   	  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   } else {
   	// Get Bookmarks from localStorage
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     //Add bookmark to array
  
     bookmarks.push(bookmark);
     //Re-set back to localstorage
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

   }

   //clear form
   document.getElementById('myForm').reset();

/*var result = JSON.parse(localStorage.getItem('bookmarks'));

console.log(result);*/

//Re-fetch Bookmarks
fetchBookmarks();
    //prevent form from submitting
	e.preventDefault();
};

//Delete Bookmarks
function deleteBookmark(url){
	//Get Bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Loop through Bookmarks
	for(var i =0;i<bookmarks.length;i++){
		if(bookmarks[i].url == url)
		{
		   //remove from array
		   bookmarks.splice(i,1);
		}

	}
	     //Re-set back to localstorage
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

//Re-fetch Bookmarks
fetchBookmarks();
}
//Fetch Bookmarks

function fetchBookmarks(){
	// Get Bookmarks from localStorage
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   	//Get Output id

   	var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';

    for(var i=0;i<bookmarks.length;i++){

    	var name = bookmarks[i].name;
    	var url = bookmarks[i].url;

    	bookmarksResults.innerHTML += '<div class="well">'+
    									'<h3>'+name+
    									'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
    									'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
    									'</h3>'+
    									'</div>'; 

    }
}

//validate form
function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
    	alert('Please use a valid url');
    	return false;
    }
    return true;
}
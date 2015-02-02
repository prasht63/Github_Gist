//Written By : Prashant kiran
//Date: 1/2/2015
//Github Link : www.github.com/prasht63/Github_Gists
	
	//Main driver function
	function callback()
    {  
      var results,request;
	  
     
	  var pagerequested=1; //setting default no . of pages to request as 1
	  
	  
        
      if (window.XMLHttpRequest)
       {
           request=new XMLHttpRequest(); //this will work for chrome and  other browser
       }
       else
       {
           alert("Please use a newer browser.Preferably greater than I.E 6")
       }
        
	   request.onreadystatechange=function() 
       {
			if(request.readyState==4 && request.status==200)
            {
				result=request.responseText; //results stored in result
				result=JSON.parse(result); //converting the results to JSON fomrat
				document.getElementById('output').innerHTML="<h4>Gists on Github | Scroll down for favourites added by You</h4>";
				document.getElementById('favourites').innerHTML="<h3>Favourites</h3>";
			        for(var i=0; i<result.length; i++)
					{   
						var names = Object.keys( result[i].files );
						if(document.getElementsByName("language")[0].checked)
						{	
							if(result[i].files[names[0]].language=="JavaScript")
							{
								if(isFavourited(result[i].id))
								{
									printout(result[i],1);
								}
								else
								{
									printout(result[i],0);
								}
							}
						}		
						if(document.getElementsByName("language")[1].checked)
							{	
								if(result[i].files[names[0]].language=="C++")
								{
									if(isFavourited(result[i].id))
									{
										printout(result[i],1);
									}
									else
									{
										printout(result[i],0);
									}
								}
							}
						if(document.getElementsByName("language")[2].checked)
						{	
							if(result[i].files[names[0]].language=="SQL")
							{
								if(isFavourited(result[i].id))
								{
									printout(result[i],1);
								}
								else
								{
									printout(result[i],0);
								}
							}
						}
						if(document.getElementsByName("language")[3].checked)
						{	
							if(result[i].files[names[0]].language=="Python")
							{
								if(isFavourited(result[i].id))
								{
									printout(result[i],1);
								}
								else
								{
									printout(result[i],0);
								}
							}
						}
					if(allunchecked())
					{
						if(isFavourited(result[i].id))
						{
							printout(result[i],1);
						}
						else
						{
							printout(result[i],0);
						}
					}
                    
				}
                
            }   
        }
		
		
        request.open("GET","https://api.github.com/gists?page="+pagerequested+"",true);
        request.send();
		
    } 
	//Function to check if we have added it as favourite or not
	function isFavourited(id)
	{
	var name=id;
	return readCookie(name);
	}
	//Function to output the results to corresponding divs
	function printout(results , flag)
	{
		if(flag==0)
		{
			document.getElementById("output").innerHTML=document.getElementById("output").innerHTML+"<a href="+results.html_url+">"+results.description+"</a><button type=button class=btn btn-default id="+"'"+results.id+"'"+" onClick=addtoFavourite("+"'"+results.id+"'"+")>Add</button><br><hr>";	
		}
		else if(flag==1)
		{
			document.getElementById("favourites").innerHTML=document.getElementById("favourites").innerHTML+"<a href="+results.html_url+">"+results.description+"</a><button type=button id="+"'"+results.id+"'"+" class=btn btn-default  onClick=removeFavourite("+"'"+results.id+"'"+")>Remove</button><br><hr>";	
		}
	}
	//Function to see if all languages unchecked
	function allunchecked()
	{
		if(!document.getElementsByName("language")[0].checked && !document.getElementsByName("language")[1].checked &&  !document.getElementsByName("language")[2].checked &&  !document.getElementsByName("language")[3].checked)
		{
			return 1;
		}
		else return 0;
	}
	//Function to add a Gist to local favourite.
	function addtoFavourite(id)
	{   document.getElementById(id).innerHTML="Added";
		var name=id;
		createCookie(id,id,7);
		
	}
	//Function to remove the cookie from the favourites
	function removeFavourite(id)
	{
		var name=id;
		eraseCookie(name,"",-1);
		document.getElementById(id).innerHTML="Removed";
	}
	//Helping functions , creates a cookie
	function createCookie(name,value,days)
	{
		if (days)
		{
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
		//console.log(document.cookie);
	}	
	//Helping function to delete a cookie
	function readCookie(name)
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) {return 1; }
		}
		return null;
	}
	//Helping function to erase a cookie , set the   days to -1
	function eraseCookie(name) 
	{
		createCookie(name,"",-1);
	}

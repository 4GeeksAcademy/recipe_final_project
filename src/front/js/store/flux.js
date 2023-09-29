const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getRecipeById: (recipe_id, setRecipe) => {
				let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe_id}`
				fetch(url)
				.then(response => response.json())
				.then(data => {
					if (data && data.meals && data.meals.length > 0) {
						setRecipe(data.meals[0])
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			verifyIfUserLoggedIn: () => {
				const token = localStorage.getItem('token');
				if (token) setStore({ token: token });
			},
			signup: (email, username, password) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
          			body: JSON.stringify({ email: email, username: username, password: password })
				}

				fetch(process.env.BACKEND_URL + 'api/signup', options)
				.then(response => {
					if (response.ok) return response.json()
					else throw Error('Something went wrong with the signup')
				})
				.then(data => {
					console.log(data)
				})
				.catch(error => {
					console.log(error)
				})
			},
			login: (email, password) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
          			body: JSON.stringify({ email: email, password: password })
				}

				fetch(process.env.BACKEND_URL + 'api/login', options)
				.then(response => {
					if (response.ok) return response.json()
					else throw Error('Something went wrong with the login')
				})
				.then(data => {
					localStorage.setItem("token", data.token);
					setStore({ token: data.token })
				})
				.catch(error => {
					console.log(error)
				})
			},
			sendForgotPasswordEmail: (email, alert) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
          			body: JSON.stringify({ email: email })
				}

				fetch(process.env.BACKEND_URL + 'api/sendemail', options)
				.then(response => {
					if (response.ok) return response.json();
					else throw Error('Something went wrong with the login');
				})
				.then(data => {
					if (data && data.msg == "success") alert("Check your inbox");
				})
				.catch(error => {
					alert("ERROR: Something went wrong");
				})
			},
			resetPassword: (token, password, alert) => {
				var options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
          			body: JSON.stringify({ password: password })
				}

				fetch(process.env.BACKEND_URL + 'api/resetpassword', options)
				.then(response => {
					if (response.ok) return response.json();
					else throw Error('Something went wrong');
				})
				.then(data => {
					if (data && data.msg == "success") alert("Password changed successfully");
				})
				.catch(error => {
					alert("ERROR: Something went wrong");
				})
			},
			getBestSellerBooks: () => {
				fetch(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.NYTIMES_API_KEY}`)
				.then(response => {
					if (response.ok) return response.json();
					else throw Error('Something went wrong');
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					alert("ERROR: Something went wrong");
				})
			},
			getBookInformationById: (isbn, setBookInfo) => {
				fetch(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.NYTIMES_API_KEY}&isbn=${isbn}`)
				.then(response => {
					if (response.ok) return response.json();
					else throw Error('Something went wrong');
				})
				.then(data => {
					if (data && data.results.length > 0) setBookInfo(data.results[0])
					console.log(data);
				})
				.catch(error => {
					alert("ERROR: Something went wrong");
				})
			}
		}
	};
};

export default getState;

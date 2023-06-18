<script>
    import {appwriteUser} from '../lib/backend';
    
    import { ID } from 'appwrite';
  
    export let email = '';
    let password = '';
  
    $: disabled = email === '' || password === '';
  
  function login() {
    const promise = appwriteUser.createEmailSession(email, password);
    promise.then((response) => {
      console.log(response);
      // set the response to a cookie that expires after 30 days
      document.cookie = `user=${response.userId}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
      // the user name is the text before the @ symbol in the email address
      document.cookie = `userName=${response.providerUid.split('@')[0]}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
  
      const session = appwriteUser.getSession('current');
      // console.log(session);
      document.cookie = `session=${session.$id}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
      const curruser = appwriteUser.get();
      curruser.then((response) => {
        console.log(response);
        document.cookie = `userName=${response.name}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
      window.location.href = '/dashboard';
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
  
  </script>
  
  <h1 class="text-center text-2xl font-bold pt-16">Welcome Back!</h1>
  <div class="flex justify-center">
    <div class="w-96 h-auto p-12 mt-12 rounded-md self-center flex flex-col gap-5">
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={login} class="bg-gray-600 disabled:hover:bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 disabled:opacity-50" disabled={disabled}>Login</button>
    <a href="/signup" class="text-center text-gray-500 hover:text-gray-700">Don't have an account? Sign Up</a>
    </div>
  </div>
  
  <style>
    input {
    border: 1px solid #ababab;
      padding: 0.5rem;
      border-radius: 5px;
      background-color: #7676762b;
    }
  </style>
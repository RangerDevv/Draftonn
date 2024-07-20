<script>
    import {appwriteUser, appwriteClient} from '../lib/backend';
    
    import { ID } from 'appwrite';
  
    export let email = '';
    let password = '';
    let errorMessage = '';
  
    $: disabled = email === '' || password === '';
  
  function login() {
    const promise = appwriteUser.createEmailSession(email, password).then(() => {
      document.cookie('session', promise.secret, { // use the session secret as the cookie value
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: promise.expire,
            path: '/dashboard',
        });
        console.log('Logged in');
        window.location.href = '/dashboard';
    }).catch((error) => {
      errorMessage = error.message;
    });
  }
  
  </script>
<div class="flex flex-col gap-5 items-center w-[60vw] mx-auto">
  <h1 class="text-center text-2xl font-bold pt-16">Welcome Back!</h1>
  <div class="flex justify-center">
    <div class="w-96 h-auto p-12 mt-12 rounded-md self-center flex flex-col gap-5">
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={login} class="bg-gray-600 disabled:hover:bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 disabled:opacity-50" disabled={disabled}>Login</button>
    <p class="text-center text-red-500">{errorMessage}</p>
    <a href="/signup" class="text-center text-gray-500 hover:text-gray-700">Don't have an account? Sign Up</a>
    </div>
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
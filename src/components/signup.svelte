<script>
    import {appwriteUser} from '../lib/backend';
    
    import { ID } from 'appwrite';
  
    let email = '';
    let password = '';
    let userName = '';
    let errorMessage = '';

    $: disabled = !email || !password || !userName;

  
  function SignUp() {
    const promise = appwriteUser.create( ID.unique() , email, password, userName);
  
    promise.then((response) => {
      console.log(response);
      window.location.href = '/login';
    }, (error) => {
      console.log(error);
      errorMessage = error.message;
    });
  }
  </script>
<div class="flex flex-col gap-5 items-center w-[60vw] mx-auto">
  <h1 class="text-center text-2xl font-bold pt-16">Welcome! We're so glad to have you!</h1>

  <div class="flex justify-center">
    <div class="w-96 h-auto p-12 mt-12 rounded-md self-center flex flex-col gap-5">
    <input type="text" bind:value={userName} placeholder="Username" />
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={SignUp} class=" bg-gray-600 disabled:hover:bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 disabled:opacity-50" disabled={disabled}>Sign Up</button>
    <p class="text-center text-red-500">{errorMessage}</p>
    <a href="/login" class="text-center text-gray-500 hover:text-gray-700">Already have an account? Login</a>
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
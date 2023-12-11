<script lang="ts">
  import {appwriteUser} from '../lib/backend';
  import { appwriteDatabases } from "../lib/backend";
  import { Query } from "appwrite";
  import { COLLECTION, DB_ID } from "../lib/ids";
  import { ID } from 'appwrite';
  import type { Models } from "appwrite/types"
  
  let email = '';
  let password = '';
  let confirmPassword = '';
  let userName = '';
  let errorMessage = '';
  let school = '';

  $: disabled = !email || !password || !userName || !confirmPassword;

  $: emailDomain = email.split("@")[1]

  let schools: Models.Document[] = []

  function updateSchools() {
    school = ''
    appwriteDatabases.listDocuments(DB_ID, COLLECTION.Schools, [
      Query.equal("Domain", emailDomain)
    ]).then(res => {schools = res.documents})
    
  }

  function checkForNew() {
    if(school !== "newschool") return;
    school = ""
    //Ask for new school name
    const newSchoolName = prompt("Enter the name of the new school:")
    appwriteDatabases.createDocument(DB_ID, COLLECTION.Schools, ID.unique(), {
      "Name": newSchoolName,
      "Domain": emailDomain
    }).then(res => {
      updateSchools()
      school = res.$id
    })
  }

  function SignUp() {
    if(emailDomain == "gmail.com" || emailDomain == "outlook.com" || emailDomain == "hotmail.com") {
      errorMessage = "You must use your school email, not a personal one."
      return
    }
    if(confirmPassword !== password) {
      errorMessage = "Passwords do not match."
      return
    }
    const promise = appwriteUser.create( ID.unique() , email, password, userName);
  
    promise.then((response) => {
      appwriteDatabases.createDocument(DB_ID, COLLECTION.User_School, ID.unique(), {
        User: response.$id,
        School: school
      }).then(() => window.location.href = '/login')
    }, (error) => {
      console.log(error);
      if(error.message == "A user with the same id, email, or phone already exists in this project.") {
        appwriteUser.createEmailSession(email, password).then(res => {
          appwriteDatabases.listDocuments(DB_ID, COLLECTION.User_School, [Query.equal("User", res.$id)])
          .then(r => r.documents)
          .then(x => {
            if(x.length > 0) {
              errorMessage = error.message;
            } else {
              appwriteDatabases.createDocument(DB_ID, COLLECTION.User_School, ID.unique(), {
                User: res.userId,
                School: school
              }).then(() => window.location.href = '/login')
            }
          })
        })
      } else {
        errorMessage = error.message;
      }
    });
  }
  </script>
<div class="flex flex-col gap-5 items-center w-[60vw] mx-auto">
  <h1 class="text-center text-2xl font-bold pt-16">Welcome! We're so glad to have you!</h1>

  <div class="flex justify-center">
    <div class="w-96 h-auto p-12 mt-12 rounded-md self-center flex flex-col gap-5">
    <input type="text" bind:value={userName} placeholder="Username" />
    <input type="email" bind:value={email} on:change={updateSchools} placeholder="School Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" />
    <select class="select select-bordered bg-gray-400" bind:value={school} on:change={checkForNew} disabled={!(email.split("@")[0] && emailDomain)}>
      <option value="">Select school...</option>
      {#if schools.length}
        {#each schools as school}
          <option value={school.$id}>{school.Name}</option>
        {/each}
      {/if}
      <option value="newschool">Add new school</option>
    </select>
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
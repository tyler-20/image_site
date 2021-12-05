<template>
  <div class="about">
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title" class="input">
        <p></p>
        <textarea v-model="desc" placeholder="Description" class="input"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <p>{{addItem.desc}}</p>
        <img :src="addItem.path" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Upload",
    data() {
      return {
        title: "",
        desc: "",
        addItem: null,
        file: null,
      }
    },
    methods: {
      async upload() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name);
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/items', {
            title: this.title,
            desc: this.desc,
            path: r1.data.path,
          });
          this.addItem = r2.data;
        } catch (error) {
          return false
        }
        this.title = "";
        this.desc = "";
        this.file = null;
      },
      fileChanged(event) {
        this.file = event.target.files[0];
      },
    },
  }
</script>

<style scoped>
  * {
    font-size: large;
  }
  img {
    width: 100%;
  }
  .input {
    width: 600px;
    background-color: #f9f9f9;
    color: #282828;
  }
  .input::placeholder {
    color: #282828;
  }
  @media only screen and (max-width: 600px) {
    .input {
      width: 90%;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .add {
    width: 100%;
  }
  .form {
    margin-top: 20px;
  }
  
  button {
    background-color: #f9f9f9;
    color: #282828;
  }
  
</style>
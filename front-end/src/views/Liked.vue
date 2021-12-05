<template>
  <div v-if='this.$root.$data.user === ""' class="about">
    <h1>Login to View Liked Images</h1>
    <div class="form">
      <input v-model="username" placeholder="UserName" class="inverse input">
      <p></p>
      <button @click="login()" class="inverse">Login/Register</button>
    </div>
  </div>
  <div v-else>
    <div v-if="arePics">
      <h1>LIKED IMAGES</h1>
      <div class="picture_container">
        <div v-for="pic in pictures" :key="pic._id">
          <div class="picture">
            <h2>{{pic.title}}</h2>
            <img :src="pic.path" alt="Pic Here">
            <p></p>
            <button class="upvotes" @click="upvotePic(pic._id)">
                <p>{{pic.upvotes}}</p>
                <img v-if="heart_pic(pic._id)" :src="hollow_path" alt="heart">
                <img v-else :src="heart_path" alt="heart">
            </button>
            <p>{{pic.desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>NO LIKED IMAGES</h1>
      <button @click="home()">Find Some</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Liked",
    data() {
      return {
        username: "",
        listOfLikedID: new Set(),
        pictures: [],
        hollow_path: require("../../public/images/hollow_heart.svg"),
        heart_path: require("../../public/images/filled_heart.svg"),
      }
    },
    created() {
      this.getLikes();
      this.getItems();
    },
    methods: {
      async login() {
        if (this.username == "") {
          return;
        }
        let response = await axios.get("/api/whoami/" + this.username);
        this.$root.$data.user = response.data;
        this.getLikes();
        this.getItems();
        return;
      },
      async upvotePic(pic_id) {
        await axios.put("/api/upvote/" + this.$root.$data.user + "/" + pic_id)
        this.getLikes();
        this.getItems();
        return;
      },
      home() {
        this.$router.push("/");
      },
      heart_pic(picID) {
        if (this.listOfLikedID.has(picID)) {
            return false
        }
        return true;
      },
      async getItems() {
        if (this.$root.$data.user === "") {
          return;
        }
        try {
          let response = await axios.get("/api/likedimages/" + this.$root.$data.user);
          // this.current_index += response.data.length;
          this.pictures = response.data.sort(function(a, b) {return b.upvotes - a.upvotes});
          return true;
        } catch (error) {
          return false
        }
      },
      async getLikes() {
        if (this.$root.$data.user === "") {
          return;
        }
        try {
          let response = await axios.get("/api/liked/" + this.$root.$data.user);
          this.listOfLikedID = new Set(response.data);
        } catch (error) {
          console.log(error);
        }
      },
    },
    computed: {
      arePics: function() {
        return this.listOfLikedID.size
      },
    }
  }
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #60f0f0;
}
.picture_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

  .input {
    font-size: large;
  }
  .input::placeholder {
    color: #282828;
  }
  .inverse {
    background-color: #f9f9f9;
    color: #282828;
    font-size: large;
  }

.picture {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    margin: 10px;
    border: solid 1px #f9f9f9;
}

.upvotes {
    display: flex;
    flex-direction: row;
    width: fit-content;
    font-size: x-large;
    padding: 0px;
    border: none;
    background: none;
    cursor:pointer;
    align-items: center;
}
.upvotes img {
    width: 25px;
    padding: 10px;
}
</style>


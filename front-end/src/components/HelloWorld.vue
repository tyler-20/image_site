<template>
  <div class="hello">
    <div class="picture_container" v-for="pic in pictures" :key="pic.path">
      <div class="picture">
        <h2>{{pic.title}}</h2>
        <img :src="pic.path" alt="Pic Here">
        <p></p>
        <button class="upvotes" @click="upvotePic(pic)">
            <p>{{pic.upvotes}}</p>
            <img :src="heart_pic(pic.path)" alt="heart">
        </button>
        <p>{{pic.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HelloWorld',
    props: {
        listOfLikes: Array,
    },
    data() {
        return {
            hollow_path: require("../../public/images/hollow_heart.svg"),
            heart_path: require("../../public/images/filled_heart.svg"),
            current_index: 0,
            num_get: 10,
        }
    },
    methods: {
        upvotePic(pic) {
            console.log(pic);
        },
        heart_pic(picPath) {
            for (let i = 0; i < this.listOfLikes.length; i++) {
                if (picPath === this.listOfLikes[i]) {
                    return this.heart_path;
                }
            }
            return this.hollow_path;
        },
        async getItems() {
            try {
                let response = await axios.get("/api/items/" + this.current_index + '/' + this.num_get);
                this.current_index += response.data.length;
                this.pictures += response.data;
                return true;
            } catch (error) {
                return false
            }
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

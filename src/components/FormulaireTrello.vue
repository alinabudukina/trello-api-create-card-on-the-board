<template lang="pug">
    el-dialog(:title='title', :visible.sync='dialogFormVisible')
        el-form(label-position='left', :model='ruleForm', :rules="rules", status-icon, ref="ruleForm" )
            el-form-item(prop="name")
                el-input(v-model='ruleForm.name', placeholder="Nom", autocomplete="off")
            el-form-item(prop="surname")
                el-input(v-model='ruleForm.surname', placeholder="Prénom", autocomplete="off")
            el-form-item(prop="email")
                el-input(v-model='ruleForm.email', placeholder="E-mail", autocomplete="off")
        span.dialog-footer(slot='footer')
            el-button(type='primary', @click='submitForm()') Envoyer
</template>
<script>
import TrelloApi from "../api/TrelloApi.js";
export default {
  name: "formulairetrello",
  props: {
    title: String,
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Champ obligatoire"));
      } else {
        if (this.ruleForm.name !== "" && this.ruleForm.name.length < 20) {
          callback();
        } else {
          callback(new Error("Champ obligatoire"));
        }
      }
    };
    var validateSurname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Champ obligatoire"));
      } else {
        if (this.ruleForm.surname !== "" && this.ruleForm.surname.length < 20) {
          callback();
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Champ obligatoire"));
      } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isTrue = re.test(value);
        if (isTrue) {
          callback();
        } else {
          callback(new Error("Email invalide"));
        }
      }
    };
    return {
      dialogFormVisible: true,
      ruleForm: {
        name: "",
        surname: "",
        email: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        surname: [{ validator: validateSurname, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const idBoard = "61053a4647d3750c81bdd5c6";
          const idList = "61053a4647d3750c81bdd5c7";
          let description = `Forme: ${this.title}\n Name: ${this.ruleForm.name}\n Surname: ${this.ruleForm.surname}\n E-mail: ${this.ruleForm.email}`;
          let data = {
            name: `New Card is here`,
            desc: description,
            idBoard: idBoard,
            idList: idList,
          };
          new Promise((resolve, reject) => {
            TrelloApi.post("", data)
              .then((response) => {
                this.dialogFormVisible = false;
                resolve(response);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-button--primary
    background-color #007f48
    border-color #007f48
.is-success
    .el-checkbox__inner
        background-color #007f48
        border-color #007f48
.el-form-item
    text-align: left;
</style>

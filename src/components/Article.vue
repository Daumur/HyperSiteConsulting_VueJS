<template>
  <div class="Article">
    <h1 class="subheading grey--text">Article</h1>
        <v-snackbar v-model="snackbar" :timeout="4000" top color="#000000">
      <span>Ajout réussi</span>
      <v-btn flat color="#FF0000" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-container class="my-5">
    <v-expansion-panels accordion>
    <v-expansion-panel v-for="project in myProjects" :key="project.title">
        <v-expansion-panel-header>
            {{project.title}}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="grey--text">
            <div class="font-weight-bold">By {{project.person}}</div>
            <div class="font-weight-bold">Due by {{project.date}}</div>
            <div>{{project.content}}</div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
    </v-container>
    <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on}">
      <v-btn color="#203DD1" text v-on="on" class="success">Add new article</v-btn>
    </template>
    <v-card elevation="24">
      <v-card-title>
        <h2>Add a new article</h2>
      </v-card-title>
      <v-form class="px-3" ref="form">
        <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
        <v-textarea label="Description" v-model="content" prepend-icon="mdi-pen" :rules="inputRules"></v-textarea>
        <v-spacer></v-spacer>
               <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="due"
            label="Date of creation"
            prepend-icon= mdi-calendar
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="due" color="#203DD1" @input="menu1 = false"></v-date-picker>
      </v-menu>
        <v-btn flat class="success mx-0 mt-3" color="#203DD1" @click="submit" :loading="loading">Add article</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projects: [
        { title: 'Maladie', person: 'Thomas', date: '10/08/2019', status: 'complete', content: 'les ravages de la peste noir' },
        { title: 'Moto', person: 'Cédric', date: '09/09/2019', status: 'ongoing', content: 'Mon futur achat' },
        { title: 'Argent', person: 'Hugo', date: '01/10/2019', status: 'ongoing', content: 'Comment gagner du fric en masse' },
        { title: 'Casque', person: 'Stéphane', date: '09/10/2019', status: 'overdue', content: 'Casque spéciale banane' }
      ],
      due: new Date().toISOString().substr(0, 10),
      title: '',
      content: '',
      menu1: false,
      inputRules: [
        v => v.length >= 3 || 'Minimum length is a 3'
      ],
      loading: false,
      dialog: false,
      snackbar: false
    }
  },
  methods: {
    async submit () {
      if (!this.$session.id()) {
        this.msgStatus = 'You are not connected'
        alert(this.msgStatus)
      } else {
        if (this.$refs.form.validate()) {
          this.loading = true
          try {
            var user = this.$session.get('username')
            const res = await this.axios.post('http://localhost:4000/api/article', {
              title: this.title,
              person: user,
              date: this.due,
              status: 'ongoing',
              content: this.content
            })
            this.snackbar = true
            this.loading = false
            this.dialog = false
            this.titre = res.data.title
            console.log(this.titre)
            this.character = res.data.person
            console.log(this.character)
            var time = res.data.date
            console.log(time)
            var stat = res.data.status
            console.log(stat)
            var contenu = res.data.content
            console.log(contenu)
          } catch (error) {
            this.error = error.response.data.message
            console.log('response', JSON.stringify(error.response))
          }
        }
      }
    }
  },
  computed: {
    myProjects () {
      return this.projects.filter(project => {
        return project.person
      })
    }
  }
}
</script>

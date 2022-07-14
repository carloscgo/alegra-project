<script>
import Layout from '@layouts/main.vue'
import propsMixin from '@utils/props-mixin'

export default {
  page: {
    title: 'Result',
    meta: [{ name: 'description', content: 'The Result page.' }],
  },

  components: { Layout },

  mixins: [propsMixin],

  bodyClass: "result-page",

  async mounted() {
    await this.fetchAllSellers()
  }
}
</script>

<template>
  <Layout>
    <parallax class="page-header header-filter" :class="$style.pageHeader" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand" :class="$style.title">
            <h1>Resultados del Concurso</h1>
          </div>
        </div>
      </div>
    </parallax>

    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Vendedores</h1>
            </md-table-toolbar>

            <md-table-row>
              <md-table-head md-id>ID</md-table-head>
              <md-table-head md-label>Nombre</md-table-head>
              <md-table-head>Puntaje</md-table-head>
            </md-table-row>

            <md-table-row v-for="(seller, index) in allSellers" :key="index">
              <md-table-cell md-id>{{ seller.id }}</md-table-cell>
              <md-table-cell md-label>{{ seller.name }}</md-table-cell>
              <md-table-cell>{{ seller.count }}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.pageHeader {
  height: 350px;
}

.title {
  color: $white;
}
</style>

<template>
  <v-app class="custom-font-change">
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app >
      <v-list>
        <v-list-item-group color="primary">
          <div>
            <v-list-item v-for="(item, i) in commons" :key="i" :to="item.link">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" class="font-weight-medium" style="font-size:15px;"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-if="getAdmin">
            <v-list-group
              v-for="(adminItem, i) in adminItems" :key="i"
              :value="listExpanded"              
              no-action
            >
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon v-text="adminItem.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="adminItem.title"></v-list-item-title>
                </v-list-item-content>
              </template> 

              <v-list-group
                v-for="(adminSubItem, j) in adminItem.subItems" :key="j" 
                no-action
                sub-group
                :value="listExpanded"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="adminSubItem.title"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(adminSubSubItem, k) in adminSubItem.subSubItems" :key="k" :to="adminSubSubItem.link"
                  :value="listExpanded"
                >
                  <v-list-item-title v-text="adminSubSubItem.title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </div>
        </v-list-item-group>
        <v-list-item v-for="(item, i) in footItems" :key="i" :to="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" class="font-weight-medium" style="font-size:15px;"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="#2171CC" @click="logout" class="white--text"><v-icon>mdi-logout</v-icon>Sair</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#2171CC" dense>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div>
        <v-img
          :src="require('../../assets/logo.png')"
          class="my-3"
          contain
          height="40"
          position= "left"
        ></v-img>
      </div>
      <div class="flex-grow-1"></div>
      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {  
  data: () => ({
    userAttributes: '',
    footItems: [
      { title: 'Perfil', icon: 'mdi-account', link: '/perfil' },
    ],
    commons: [
      { title: 'Mapa de entregas', icon: 'mdi-map', link: '/entregas' },
    ],
    adminItems: [
      { 
        title: 'Gestão', icon: 'mdi-folder-cog-outline', active: false, subItems: [
          {   
            title: 'Logística', icon: 'mdi-truck', subSubItems: [
              { title: 'Transportadoras', icon: 'mdi-truck', link: '/configuracoes/logistica/transportadoras' },
            ]
          },
          { 
            title: 'Relatórios', subSubItems: [
              { title: 'Ordens de Serviço', icon: 'mdi-clipboard-text-multiple-outline', link: '/configuracoes/relatorios/ordens-de-servico' },
            ]
          }
        ]
      }
    ],
    clipped: true,
    drawer: true,
    miniVariant: false,
    right: true,
    listExpanded: false,
    title: 'iFrete'
  }),
  methods: {
    ...mapActions({
      logout: 'cognito/logout'
    }),
    handle_function_call(function_name) {
      this[function_name]()
    },
  },
  computed: {
      ...mapGetters({
          getAdmin: 'cognito/getAdmin'
      })
  },
  created() {
    this.$vuetify.lang.locales = {
      pt: {
        dataIterator: {
          pageText: '{0}-{1} de {2}',
          noResultsText: 'Nenhum dado encontrado',
          loadingText: 'Carregando itens...'
        },
        dataTable: {
          itemsPerPageText: 'Linhas por página:',
          ariaLabel: {
            sortDescending: ': Ordenado decrescente. Ative para remover a ordenação.',
            sortAscending: ': Ordenado crescente. Ative para ordenar decrescente.',
            sortNone: ': Não ordenado. Ative para ordenar crescente.',
            activateAscending: '',
            activateDescending: '',
            activateNone: ''
          }
        },
        dataFooter: {
          itemsPerPageText: 'Itens por página:',
          itemsPerPageAll: 'Todos',
          nextPage: 'Próxima página',
          prevPage: 'Página anterior',
          firstPage: 'Página primeira',
          lastPage: 'Página última',
          pageText: '{0}-{1} de {2}'
        },
        datePicker: {
          itemsSelected: '{0} selecionados'
        },
        noDataText: 'Não há dados disponíveis',
        carousel: {
          prev: 'Visão anterior',
          next: 'Próxima visão'
        },
        calendar: {
          moreEvents: 'Mais {0}'
        },
        fileInput: {
          counter: '{0} files',
          counterSize: '{0} arquivos ({1} em total)'
        }
      }
    };
    this.$vuetify.lang.current = 'pt';
  }
};
</script>

<style>
  .custom-font-change{
    font-family: 'Poppins', sans-serif !important;
  }
  
  .v-item--active{
    color: #2171CC!important;
  }

  .v-item :hover{
    color: #2171CC!important;
  }
  .v-list-item--active > .v-list-item__icon {
    color: #2171CC!important;
  }

  .v-list-item--active > .v-list-item__content{
    color: #2171CC!important;
  }

  .v-list-item__action:first-child, .v-list-item__icon:first-child{
    margin-right: 10px!important;
  }


</style>


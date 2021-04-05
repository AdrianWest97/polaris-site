<template>
        <v-dialog
          v-model="newProductDialog.visible"
          max-width="800px"
          persistent
          :retain-focus="false"
          scrollable
          :overlay-color="$store.state.ui.overlay_color"

        >
        <validation-observer ref="observer" v-slot="{invalid}">
          <v-form
          ref="form"
          method="POST"
          >
          <v-card :loading="loading" :disabled="loading">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
        <v-col
        cols="6"
        >
        <validation-provider name="Category" rules="required">
          <v-autocomplete
            v-model="form.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            label="Select category"
            slot-scope="{ errors }"
            :error-messages="errors"
          ></v-autocomplete>
        </validation-provider>
          </v-col>
                  <v-col
                    cols="12" sm="6" md="6">
                <validation-provider name="Name" rules="required">
                    <v-text-field
                      v-model="form.name"
                      label="Name"
                      hint="What is the product called"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                </validation-provider>
                  </v-col>
                      <v-col
                    cols="12">
                    <validation-provider name="Caption" rules="required">
                    <v-text-field
                      v-model="form.caption"
                      label="Product caption"
                      hint="Basic text to describe the product"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                </validation-provider>
                  </v-col>

                  <v-col cols="12">
                <validation-provider name="description" rules="required">
                    <v-textarea
                      v-model="form.description"
                      label="Description"
                      hint="Detailed description of the product"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-textarea>
                </validation-provider>
                  </v-col>
                <v-col  cols="12" sm="6" md="6">
                <validation-provider name="Price" rules="required">
                    <v-text-field
                      v-model="form.price"
                      prefix="$"
                      type="number"
                      label="Price per unit"
                      hint="Cost for a single item"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                </validation-provider>
                  </v-col>
                    <v-col  cols="12" sm="6" md="6">
                    <validation-provider name="Stock" rules="required">
                    <v-text-field
                      v-model="form.stock"
                      type="number"
                      label="# of items in stock"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                </validation-provider>
                  </v-col>

                   <v-col cols="12" class="grey lighten-4" >
                 <v-col cols="12">
                    <validation-provider name="Source" rules="required">
                     <v-select
                      :items="image_source"
                      item-text="text"
                      filled
                      outlined
                      item-value="source"
                      label="Select image source"
                      v-model="selected"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-select>
                    </validation-provider>
                 </v-col>
                     <v-col cols="12" v-show="selected == 'url'">
                    <validation-provider name="Image url" :rules="selected == 'url' ? 'required|url' : ''">
                     <v-text-field
                      label="Enter image url"
                      v-model="form.image_url"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                    </validation-provider>
                 </v-col>
                    <v-col cols="12" v-show="selected == 'device'">
                    <validation-provider name="Image" :rules="selected == 'device' ? 'required' : ''">
                    <v-file-input
                        label="Select from device"
                        outlined
                        dense
                        hint="Select a product image from this device"
                        :accept="acceptTypes"
                        v-model="form.image"
                        append-icon="mdi-camera"
                      >
                      </v-file-input>
                    </validation-provider>
                    </v-col>
                     <v-row>


                     <template v-if="newProductDialog.mode == 'edit'">
                     <v-col cols="12">
                          <v-img
                          v-if="newProductDialog.item.use_url && selected == 'url'"
                          :src="newProductDialog.item.image_url"
                          contain
                          :aspect-ratio="1"
                          height="150"
                          width="150"
                          rounded
                          >
                      <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
                     </template>
                      </v-img>
                        <v-img
                          v-if="newProductDialog.item.image && selected == 'device'"
                          :src="$helpers.loadImage(newProductDialog.item.image.original)"
                          contain
                          :aspect-ratio="1"
                          height="150"
                          width="150"
                          rounded
                          >
                <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              </v-img>
                     </v-col>
                     </template>

                </v-row>
                   </v-col>
                  <v-col cols="12">
                    <validation-provider name="tags" rules="required">
                    <v-combobox multiple
                    v-model="form.tags"
                    required
                    label="Tags"
                    append-icon
                    chips
                    hide-selected
                    :counter="5"
                    hint="Add product tags"
                    clearable
                    :rules="[v => !!v || 'Add up to 5 blog tags']"
                    deletable-chips
                    :search-input.sync="tag"
                    @keyup.tab="updateTags"
                    @paste="updateTags">

                 </v-combobox>
                    <span class="text-danger" v-if="errors.tags">
                            Add up to 5 blog tags
                            </span>
                        </validation-provider>
                        </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="addProduct()"
                :disabled="invalid"
              >
              Save
              </v-btn>
            </v-card-actions>
          </v-card>
            </v-form>
        </validation-observer>
        </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { required} from 'vee-validate/dist/rules'
import Api from '../../apis/Api';
setInteractionMode('eager')
extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

extend('url', {
  validate(value) {
    var pattern = new RegExp(/(https?:\/\/.*\.(?:png|jpg|svg|jpeg))/i); // fragment locator
    return pattern.test(value);
  },
  message: 'Please enter a valid image url.'
});

function initialState  (){
  return {
loading:false,
categories:[],
tag:'',
acceptTypes:"image/x-png,image/svg,image/jpeg",
selected:null,
image_source:[
    {source:"url",text:"Upload from url"},
    {source:"device",text:"Select from this device"}
    ],
form:{
 description:'',
 name:'',
 stock:null,
 visible:false,
 is_featured:null,
 tags:[],
 category_id:null,
 price:null,
 use_url:null,
 image_url:'',
 image:null,
 id:null,
 caption:''
},
errors: [],
  }
}
export default {
data: function (){
    return initialState();
} ,
computed:{
    ...mapState('product',['newProductDialog']),
    formTitle(){
        return this.newProductDialog.mode == 'edit' ? 'Update Product' : 'New Product'
    },
},
watch:{
newProductDialog(value){
  if(value.mode == 'edit'){
    this.update_fields();
  }
  if(value.visible){
      this.fetchCategories()
  }
  if(value.use_url){
    this.selected = "url"
  }
},
     form:{
        deep: true,
        handler(val){
        if(val.tags.length > 5)
           this.$nextTick(() => this.form.tags.pop())
        }
      },
},

methods:{
  ...mapActions({
    successSnack:'ui/successSnack',
    errorSnack:'ui/errorSnack'
    }),
    close(){
      this.$refs.form.reset(); //clear form values
        this.$refs.observer.reset(); //reset validation
      Object.assign(this.$data, initialState());
      this.$nextTick(()=>{
      this.$store.commit('product/SET_NEW_PRODUCT_MODEL',{
         visible:false,
         mode:'add',
         item:null
        })
      })
    },
    addProduct(){
        this.loading = true;
        this.form.use_url = this.selected == 'url' ? true : null;
             let formData = new FormData();
             for(const [key, value] of Object.entries(this.form)){
                  formData.append(key,value);
                  if(formData.has('id')  && formData.get('id') == 'null'){
                    formData.delete('id')
                  }
            }
        this.$store.dispatch('product/saveProduct',formData)
       .then(() =>{
         this.$nextTick(()=>{
          this.successSnack("Product added to inventory")
        this.loading = false;
         this.close();
         })
       }).catch((err)=>{
         this.loading = false;
          this.errorSnack(err)
         console.log(err)
       })
    },

    fetchCategories(){
        Api().get('/categories')
        .then((res)=>{
          this.categories = res.data
        }).catch((err)=>{
           this.errorSnack("Somehing went wrong while fetching categories")
            console.log(err);
        })
    },
    update_fields(){
     this.form = Object.assign({}, this.newProductDialog.item)
     this.form.tags = this.newProductDialog.item.tags.split(',');
     this.form.category = this.newProductDialog.item.category ? this.newProductDialog.item.category.id : '';
    this.selected = this.newProductDialog.item.use_url ? 'url' : 'device'
    },
    updateTags() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.tag = "";
        });
      });
    }
},

components:{
    ValidationProvider,
    ValidationObserver
}
}
</script>

<style lang="scss" scoped>
</style>


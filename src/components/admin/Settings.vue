<template>
  <div class="packages my-5">
    <h1 class="subheading grey--text">Settings</h1>
    <div class="container-fluid">
      <v-card flat>
        <v-tabs background-color="teal darken-3" show-arrows dark>
          <v-tab>
            <v-icon left> mdi-google-maps </v-icon>
            Pickup Locations & US Address
          </v-tab>
          <v-tab>
            <v-icon left> mdi-package-variant-closed </v-icon>
            Package Status update
          </v-tab>

          <v-tab-item :transition="false">
            <v-card flat class="pa-lg-5">
              <v-card-text>
                <v-card-title>Current Pickup Locations</v-card-title>
                <v-row dense>
                  <v-col
                    cols="12"
                    md="5"
                    class="pa-5"
                    v-for="location in settings.pick_ups"
                    :key="location.id"
                  >
                    <v-text-field
                      dense
                      :outlined="location.id == isEditing"
                      :value="location.location"
                      :readonly="location.id != isEditing"
                      :disabled="location.id != isEditing"
                      :v-text="location.location"
                      @blur="save"
                    >
                      <template v-slot:append>
                        <v-btn
                          small
                          @click="isEditing = location.id"
                          icon
                          color="grey"
                        >
                          <v-icon small> mdi-pencil </v-icon></v-btn
                        >
                        <v-btn
                          small
                          @click="deleteLocation(location.id)"
                          icon
                          color="red"
                        >
                          <v-icon small> mdi-close </v-icon></v-btn
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"> </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                      outlined
                      v-model="newLocation"
                      dense
                      label="Enter Location"
                    >
                      <template v-slot:append>
                        <v-btn :disabled="!newLocation" icon color="success">
                          <v-icon> mdi-check </v-icon></v-btn
                        >
                      </template>
                    </v-text-field>
                    <v-btn
                      :disabled="!newLocation"
                      @click="add_new()"
                      color="primary"
                      >Save</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card flat class="pa-lg-5">
              <v-card-text>
                <v-card-title>Us address</v-card-title>
                <v-row>
                  <v-col
                    cols="12"
                    lg="4"
                    xl="3"
                    v-for="us_address in settings.us_addresses"
                    :key="us_address.id"
                  >
                    <v-form
                      :id="`form_${us_address.id}`"
                      @submit.prevent="update_address(us_address.id)"
                      :disabled="editingAddress != us_address.id"
                    >
                      <v-hover>
                        <v-card outlined :class="{ default: us_address.is_default}">
                          <v-toolbar flat dense>
                            <v-spacer></v-spacer>
                            <v-menu bottom left dense>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item
                                  @click="editingAddress = us_address.id"
                                >
                                  <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                  @click="delete_us_address(us_address.id)"
                                >
                                  <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="setDefaultUsAddress(us_address.id)">
                                  <v-list-item-title
                                    >Set as default</v-list-item-title
                                  >
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </v-toolbar>
                          <v-card-text>
                            <v-text-field
                              label="Address Line"
                              :value="us_address.address_line"
                              :id="`street_${us_address.id}`"
                            >
                            </v-text-field>
                            <v-text-field
                              label="State"
                              :value="us_address.state"
                              :id="`state_${us_address.id}`"
                            ></v-text-field>
                            <v-text-field
                              label="City"
                              :value="us_address.city"
                              :id="`city_${us_address.id}`"
                            ></v-text-field>
                            <v-text-field
                              label="Zip"
                              :value="us_address.zip_code"
                              :id="`zip_${us_address.id}`"
                            ></v-text-field>
                          </v-card-text>
                            <v-card-actions>
                           <v-spacer></v-spacer>
                            <v-btn type="submit" v-show="editingAddress == us_address.id" class="primary" depressed>Save</v-btn>
                            </v-card-actions>
                        </v-card>
                      </v-hover>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item :transition="false">
            <v-card flat class="pa-lg-5">
              <v-card-text>
                <v-card-title>Package email templates</v-card-title>
                <v-card-subtitle
                  >Add custom email for each package status</v-card-subtitle
                >
                <v-row dense>
                  <v-col cols="12" lg="6" md="5">
                    <v-select
                      :items="settings.status_templates"
                      label="Select package status"
                      item-text="status"
                      item-value="id"
                      @change="setContent($event)"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea outlined v-model="content"> </v-textarea>
                    <div class="d-flex flex-row-reverse my-5">
                      <v-btn
                        class="primary"
                        @click="updateStatus()"
                        large
                        :disabled="!content || selectedId == -1"
                        >Save</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    isEditing: -1,
    selectedId: -1,
    editingAddress: -1,
    newLocation: "",
    newStatus: "",
    content: "",
    us_address_form: {
      address_line: "",
      state: "",
      city: "",
      zip_code: "",
      is_default:false
    },
  }),

  computed: {
    ...mapGetters("admin", ["settings"]),
  },
  created() {},

  methods: {
    ...mapActions({
      loadSettings: "admin/loadSettings",
      successSnack: "ui/successSnack",
      errorSnack: "ui/errorSnack",
    }),
    save(e) {
      this.$store
        .dispatch("admin/saveLocation", {
          location: e.target.value,
          id: this.isEditing,
        })
        .then(() => this.successSnack("Operation Completed"))
        .catch(() => this.error("Could not complete operation"));
    },

    add_new() {
      this.$store
        .dispatch("admin/saveLocation", {
          location: this.newLocation,
        })
        .then(() => {
          this.newLocation = "";
          this.successSnack("Operation Completed");
        })
        .catch(() => this.errorSnack("Could not complete operation."));
    },
    deleteLocation(id) {
      this.$store
        .dispatch("admin/deleteLocation", id)
        .then(() => this.successSnack("Delete success"))
        .catch(() => this.error("Could not complete operation"));
    },
    update_address(id) {
      var form = document.querySelector(`#form_${id}`);
      var formData = {
        address_line: form.querySelector(`#street_${id}`).value,
        city: form.querySelector(`#city_${id}`).value,
        state: form.querySelector(`#state_${id}`).value,
        zip_code: form.querySelector(`#zip_${id}`).value,
        id: this.editingAddress,
        is_default: this.defaultUsAddress == id
      };

      this.$store
        .dispatch("admin/saveAddress", formData)
        .then(() => {
          this.editingAddress = -1;
          this.successSnack("Operation Completed");
        })
        .catch(() => this.error("Could not complete operation"));
    },

    setDefaultUsAddress(id){
      this.editingAddress = id;
      this.defaultUsAddress = id;
    },
    delete_us_address(id) {
      this.$store
        .dispatch("admin/deleteUsAddress", id)
        .then(() => this.successSnack("Operation Completed"))
        .catch(() => this.error("Could not complete operation"));
    },
    setContent(id) {
      this.selectedId = id;
      this.content = this.settings.status_templates.find(
        (status) => status.id == id
      ).email_template;
    },
    updateStatus() {
      this.$store
        .dispatch("admin/updatePackageStatus", {
          email_template: this.content,
          id: this.selectedId,
          status: this.selectedId
            ? this.settings.status_templates.find(
                (status) => status.id == this.selectedId
              ).status
            : this.newStatus,
        })
        .then(() => {
          this.selectedId = -1;
          this.successSnack("Operation Completed");
        })
        .catch(() => this.errorSnack("Could not complete operation"));
    },
  },
};
</script>

<style scoped lang="scss">
.default {
  border: 4px solid rgb(0, 189, 101) !important;
}
</style>

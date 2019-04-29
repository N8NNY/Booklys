<template>
        <v-card 
        class="amber lighten-3">

        <v-card-title class="amber darken-1">
            <div class="subheadline">Share Book</div>
        </v-card-title>
        <v-layout justify-center wrap>
                <v-flex md11>
                    <v-text-field
                    label="Name"
                    outline
                    class="mt-2"
                    >
                    </v-text-field>
                    
                    <v-text-field
                    label="Author"
                    class=""
                    outline
                    >
                    </v-text-field>

                    <v-text-field
                    label="Description"
                    outline
                    counter
                    maxlength="140"
                    >
                    </v-text-field>

                </v-flex>

                <v-flex md11 class="text-md-center">
                    <v-text-field 
                    box 
                    label="Select Image" 
                    prepend-inner-icon="image"
                    @click="$refs.image.click()"
                    v-model='imageName'
                    >
                    </v-text-field>
                    <input 
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                    >
				</v-flex>

            </v-layout>

            <v-card-actions class="justify-end amber darken-1">
                <v-btn class="mr-4 orange darken-4 white--text" flat>Post</v-btn>
            </v-card-actions>  
        </v-card>
</template>

<script>

export default {
    data() {
        return {
        selectedFile: null,
        imageName: '',
      }
    },
    methods: {
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
			} else {
				this.imageName = ''
			}
        }
        
    }

}
</script>

<template>
    <div>
        <input type="file" @change="onFileChanged">
        <button @click="onUpload">Upload</button>
    </div>
</template>

<script>
    import { getAPI } from '../axios-api'

    export default {
        name: 'UploadImage',

        data() {
            return {selectedFile: null }
        },
        
        methods: {
            onFileChanged (event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload() {
                const formData = new FormData()
                formData.append('photo', this.selectedFile)

                getAPI.post('/home/upload-image/', formData, {headers: 
                                                            {Authorization: `Bearer ${this.$store.state.accessToken}` }, 
                                                            ContentType: "multipart/form-data"  
                                                            })
            }
        },
    }
</script>

<style scoped>

</style>
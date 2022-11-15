<template>
	<div class="card">
        <div class="d-flex card-content">
            <ol class="breadcrumbs">
                <li>Folder</li>
                <li>Folder</li>
                <li class="active">Folder</li>
            </ol>

            <div class="ml-auto">
                <v-button class="btn-soft btn-xs">
                    Create
                </v-button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th style="width: 20px"></th>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Size</th>
                    <th>Modified</th>
                    <th style="width: 20px"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><i class="icon-folder" /></td>
                    <td>Folder</td>
                    <td class="d-flex align-items-center">
                        <div class="profile-picture mr-2">
                            <img src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
                        </div>

                        User
                    </td>
                    <td>3.2 GB</td>
                    <td>2022-11-15 09:38:36</td>
                    <td class="d-flex justify-content-end">
                        <v-button class="btn-soft btn-xs">
                            Edit
                        </v-button>
                    </td>
                </tr>
                <tr>
                    <td><i class="icon-document" /></td>
                    <td>Document</td>
                    <td class="d-flex align-items-center">
                        <div class="profile-picture mr-2">
                            <img src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
                        </div>

                        User
                    </td>
                    <td>2.9 MB</td>
                    <td>1 hour ago</td>
                    <td class="d-flex justify-content-end">
                        <v-button class="btn-soft btn-xs">
                            Edit
                        </v-button>
                    </td>
                </tr>
                <tr>
                    <td><i class="icon-image" /></td>
                    <td>Image</td>
                    <td class="d-flex align-items-center">
                        <div class="profile-picture mr-2">
                            <img src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
                        </div>

                        User
                    </td>
                    <td>64 KB</td>
                    <td>Yesterday</td>
                    <td class="d-flex justify-content-end">
                        <v-button class="btn-soft btn-xs">
                            Edit
                        </v-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
	export default {
		name: 'VFileTree',

		props: {
			folders: {
				type: Object,
				default: {}
			},
			files: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style scoped>
.breadcrumbs {
    display: block;
    padding: 0;
    margin: 0;
}
.breadcrumbs li {
    display: inline-block;
    padding: 0;
    margin: 0;
    font-size: 22px;
    color: var(--color-muted-500);
}
.breadcrumbs li.active {
    color: var(--color-gray-900);
    font-weight: bold;
}
.breadcrumbs li:not(:last-child):after {
    display: inline-block;
    border-right: 2px solid var(--color-muted-500);
    border-bottom: 2px solid var(--color-muted-500);
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    content: " ";
    margin: 3px 10px;
}
.profile-picture {
    border-radius: 50%;
    overflow: hidden;
    height: 25px;
    width: 25px;
}
.profile-picture img {
    -o-object-fit: cover;
    object-fit: cover;
    min-height: 100%;
}
.icon-folder,
.icon-folder::after {
    color: var(--color-muted-500);
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 22px;
    height: 16px;
    border: 2px solid;
    border-radius: 3px;
}
.icon-folder::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 4px;
    border-bottom: 0;
    border-top-left-radius: 2px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    top: -5px;
}
.icon-document {
    color: var(--color-muted-500);
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 14px;
    height: 16px;
    border: 2px solid transparent;
    border-right: 0;
    border-top: 0;
    box-shadow: 0 0 0 2px;
    border-radius: 1px;
    border-top-right-radius: 4px;
    overflow: hidden;
}
.icon-document::after,
.icon-document::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
}
.icon-document::before {
    background: currentColor;
    box-shadow: 0 4px 0, -6px -4px 0;
    left: 0;
    width: 10px;
    height: 2px;
    top: 8px;
}
.icon-document::after {
    width: 6px;
    height: 6px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    right: -1px;
    top: -1px;
}
.icon-image {
    color: var(--color-muted-500);
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 16px;
    overflow: hidden;
    box-shadow: 0 0 0 2px;
    border-radius: 2px;
}
.icon-image::after,
.icon-image::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border: 2px solid;
}
.icon-image::after {
    transform: rotate(45deg);
    border-radius: 3px;
    width: 16px;
    height: 16px;
    top: 9px;
    left: 6px;
}
.icon-image::before {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    top: 2px;
    left: 2px;
}
</style>

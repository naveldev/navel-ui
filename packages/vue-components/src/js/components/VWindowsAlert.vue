<template>
    <div class="alerts">
        <div class="alert" ref="draggableContainer">
            <div class="alertHead" @mousedown.prevent="dragMouseDown">
                <p class="alertTitle">Application Error</p>

                <div class="closeAlert" @click="closeAlert"></div>
            </div>
            <div class="alert-content">
                <div class="icon"></div>

                <p>{{ content }}</p>

                <div class="button" @click="closeAlert">Ok</div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        name: 'VWindowsAlert',

        props: {
            title: {
                type: String,
                default: 'Error'
            },
            content: {
                type: String,
                default: 'Lorem ipsum.'
            },
            repeatable: {
                type: Boolean,
                default: false
            },
            dismissable: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                cloneCount: 0,
                clones: [],
                positions: {
                    clientX: undefined,
                    clientY: undefined,
                    movementX: 0,
                    movementY: 0
                }
            }
        },

        methods: {
            closeAlert: function (event) {
                // remove event.target
            },
            dragMouseDown: function (event) {
                event.preventDefault()

                // get the mouse cursor position at startup:
                this.positions.clientX = event.clientX
                this.positions.clientY = event.clientY

                this.$el.onmousemove = this.elementDrag
                this.$el.onmouseup = this.closeDragElement
            },
            elementDrag: function (event) {
                event.preventDefault()

                this.positions.movementX = this.positions.clientX - event.clientX
                this.positions.movementY = this.positions.clientY - event.clientY

                this.positions.clientX = event.clientX
                this.positions.clientY = event.clientY

                if (this.repeatable) {
                    if (this.clones.length <= 200 && this.cloneCount >= 5) {
                        let nodes = this.$el.querySelectorAll('.alert')

                        this.clone = nodes[nodes.length - 1].cloneNode(true)

                        this.clone.style.zIndex = '-1'

                        this.clones.push(this.clone)

                        this.$el.insertBefore(this.clone, this.$refs.draggableContainer)

                        this.cloneCount = 0
                    }

                    this.cloneCount++
                }

                // set the element's new position:
                this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
                this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
            },
            closeDragElement () {
                this.$el.onmouseup = null
                this.$el.onmousemove = null
            }
        }
	}
</script>

<style scoped>
.alert {
    font-family: 'Noto Sans JP', sans-serif;
    z-index: 100009 !important;
    position: fixed;
    width: 500px;
    padding: 3px;
    margin: 0 auto;
    top: 0;
    color: #000;
    background: linear-gradient(#015cf5, #203098);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    user-select: none;
}
.alert.shadow {
    pointer-events: none;
}
.alert:not(.shadow) {
    z-index: 1;
}
.alert .alertHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 2px 5px 2px;
    color: #fff;
}
.alert .alertHead .alertTitle {
    text-shadow: 1px 1px 2px #000;
}
.alert .alertHead .closeAlert {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: radial-gradient(#e9908d 25%, #d6351c);
    border: 1px solid #fff;
    position: relative;
}
.alert .alertHead .closeAlert:before, .alert .alertHead .closeAlert:after {
    content: "";
    position: absolute;
    width: 70%;
    height: 2px;
    background-color: #fff;
    transform: rotate(45deg);
}
.alert .alertHead .closeAlert:after {
    transform: rotate(-45deg);
}
.alert .alert-content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: #efebdf;
}
.alert .alert-content .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 50%;
    background: linear-gradient(#c98182, #ce0a0b 50%);
    box-shadow: inset 0 -1px 3px 0 #000;
    position: relative;
}
.alert .alert-content .icon:before, .alert .alert-content .icon:after {
    content: "";
    position: absolute;
    width: 70%;
    height: 5px;
    background-color: #fff;
    transform: rotate(45deg);
}
.alert .alert-content .icon:after {
    transform: rotate(-45deg);
}
.alert .alert-content p {
    font-size: 14px;
    width: calc(100% - 60px);
}
.alert .alert-content .button {
    padding: 3px;
    min-width: 110px;
    height: 34px;
    margin: 20px auto 0 auto;
    border: 1px solid #000;
    border-right-width: 2px;
    border-bottom-width: 2px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
}
.alert .alert-content .button:active {
    border-width: 2px;
}
</style>

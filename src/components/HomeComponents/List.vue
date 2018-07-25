<template>
    <section>
        <div class="list-container">
        <ul>
            <li class="h-list-item">
                <div class="item-img">1</div>
                <div class="location">Red Deer, AL</div>
                <div class="reviews">Reviews ****</div>
                <div class="country">4</div>
            </li>
        </ul>
        </div>
    </section>
</template>

<script>

export default {
  name: 'ListHome',
  components: {}
}
</script>
<style lang="scss">
    .list-container {
        font-family: 'roboto-medium';
        color: #383633;
        ul {
            margin: 0;
            padding: 0;
        }
        .h-list-item {
            display: flex;
            flex-direction: column;
            .item-img {}
            .location {
                font-size: 0.8rem;
            }
            .country {
                font-size: 0.8rem;
            }
        }
    }
</style>

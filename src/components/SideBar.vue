<template>
  <div
    class="
      d-flex
      flex-column
      position-fixed
      h-100
      flex-shrink-0
      p-3
      text-white
      bg-dark
      sideBar
    "
  >
    <a
      href="/"
      class="
        d-flex
        align-items-center
        mb-3 mb-md-0
        me-md-auto
        text-white text-decoration-none
      "
    >
      <svg class="bi me-2" width="40" height="32">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          Users/inventories
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white"> Dashboard </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white"> Orders </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white"> Products </a>
      </li>

      <li>
        <a href="#" class="nav-link text-white"> Customers </a>
      </li>

      <li>
        <a href="/create/inventory" class="nav-link text-white"> Create </a>
      </li>
    </ul>
    <hr />
    <p>© Vakho, Vaso, Nika, Jaba</p>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

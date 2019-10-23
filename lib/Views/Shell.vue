<template>
  <div class="test-shell">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "TestShell"
};
</script>

<style>
.test-shell {
  background-color: whitesmoke;
  font-family: "Roboto";
}
.test-shell .action {
  filter: brightness(1);
  transition: all 0.3s linear;
  cursor: pointer;
}
.test-shell .action:hover {
  filter: brightness(1.2);
}
.test-shell .square {
  border-radius: 0;
}
.test-shell .no-select {
  user-select: none;
}

</style>
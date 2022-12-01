/**
 * some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
 * 数组中有至少一个元素通过回调函数的测试就会返回 true；所有元素都没有通过回调函数的测试返回值才会为 false。
 */
const array = ['admin', 'root'];

const roles = ['admin', 'root', 'a'];

const hasRoles = array.some((role) => {
  // roles.some((role2) => {
  //   console.log(role, role2);
  //   // if (role == role2) {
  //   //   return true;
  //   // }
  //   return role == role2;
  // });
  // return role == 'admin';
  return roles.some((role2) => role == role2);
  // return roles.map((role2) => role == role2);
});

console.log(hasRoles); // true

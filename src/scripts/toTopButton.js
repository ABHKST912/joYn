const NAV_HEIGHT = 56;
window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");
  let prev = null;
  let footer = null;
  
  const reset = () => {
    // Все все все... возвращаем как было.. верняк, что хедер в дефолтном положении
    navbar.classList.remove("fixed", "show")
    prev = null;
    footer = null;
  }
  
  const onScroll = (e) => {
    const scroll = document.documentElement.scrollTop; // Позиция текущего скролла
    console.log(`Scroll position: ${scroll}`);
    
    // ДВИЖУХА ВОКРУГ FIXED/STATIC
    
    if ( scroll > NAV_HEIGHT){
      // Зашли ли мы за хедер
      if (!navbar.classList.contains("fixed")){ // А если класс fixed уже есть, зачем нам его снова добавлять?
        navbar.classList.add("notransition")
        navbar.classList.add("fixed")
        setTimeout(() => {
          navbar.classList.remove("notransition")
        }, 0)
      }
    } else {
      // Если не зашли (А значит находимся выше хедера) то чекаем..
      // если меню уже показано(закреплено(fixed) к вьюпорту)...
      // ничего не делаем, значит, что мы с верхней меню хотим пристыковаться к верхней позиции
      if (!navbar.classList.contains("show")) {
        reset()
      }
    }
    
    // Если скролл равен нулю – гарантированно, что хеадер не зафиксирован(отсутвует класс fixed)
    if (scroll === 0){
      reset()
    }
    
    // ПОЯВЛЕНИЕ/ИСЧЕЗНОВЕНИЕ ПРИ СКРОЛЛЕ
    
    // А куда мы движемся?
    if (scroll > prev && prev){
      // 👇 (движемся вниз)
      footer = scroll; // фиксируем нижнее положение (для того чтобы отмерить 100px перед тем как снова показать меню)
      navbar.classList.remove("show")
    } else {
      // ☝️ (движемся вверх)
      if (footer - scroll > 100 || prev === null){ // Ну как... мы же помним наше нижнее положение.. раздолье.. теперь можем узнать как делеко мы поднялись
        navbar.classList.add("show")
      }
    }
    prev = scroll // Сохраним позицию скролла для того чтобы в следующей итерации понять, куда мы движемся (👇/☝️)
  }
  
  window.addEventListener("scroll", onScroll)
  onScroll()
})

window.addEventListener("load", () => {
    const btn = document.getElementById("to_top");
    
    function toTop(duration){
      let step_count = duration / 16;
      
      
      const step = window.pageYOffset / step_count
      console.log(step_count, step)
      
      requestAnimationFrame(function cb(){
        window.scrollBy(0, -step)
        step_count--
        if (step_count > 0){
          requestAnimationFrame(cb)
        }
      })
  
    }
    
    function showBtn(){
      btn.style.display = "block";
    }
    
    function hideBtn(){
      btn.style.display = "none";
    }
    
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 0){
        showBtn();
      }else{
        hideBtn();
      }
    })
    
    btn.addEventListener("click", function(){
      toTop(400)
    });
  })
  
  
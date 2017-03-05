27, 2017-03-02学习笔记, 知识点 一、static public class Spike
{
public static void main(String[] args)
{
Counter a = new Counter();
System.out.println(a.increment());
System.out.println(a.anot, <h1 id="h1-u77E5u8BC6u70B9"><a name="知识点" class="reference-link"></a><span
        class="header-link octicon octicon-link"></span>知识点</h1><h4 id="h4--static"><a name="一、static"
                                                                                       class="reference-link"></a><span
        class="header-link octicon octicon-link"></span>一、static</h4>
<pre><code class="lang-java">public class Spike
{
    public static void main(String[] args)
    {
        Counter a = new Counter();
        System.out.println(a.increment());
        System.out.println(a.anotherIncrement());
        Counter b = new Counter();
        System.out.println(b.increment());
    }
}
class Counter
{
    private static int count = 0;
    public int increment()
    {
        return count++;
    }
    public int anotherIncrement()
    {
        return ++count;
    }
}
</code></pre>
<p>count是静态变量，为所有对象所共享，因此不管a.increment()还是b.increment()都会使count持续增加。<br>increment()方法返回当前count值，然后count增加1<br>antoherIncrement()方法让count增加1，然后返回count值<br>第一次a.increment()返回值为0，此时count值为1<br>第二次a.anotherIncrement()先让count+1再返回，返回值为2<br>第三次b.increment()先返回count当前值2，然后count+1
</p>
<h4 id="h4--aop-"><a name="二、AOP面向切面" class="reference-link"></a><span class="header-link octicon octicon-link"></span>二、AOP面向切面
</h4>
<p>AOP的概念是Aspected Oriented Programming 面向方面编程。<br>
    好处：AOP将程序分解成各个方面或者说关注点。这使得可以模块化，相当横向上分切了。它可以解决OOP和过程化方法不能够很好解决的横切（crosscut）问题，如：事务、安全、日志等横切关注。<br> 实现AOP有几种方式:<br>
    1.Spring 1.2版本中通过ProxyFactoryBean来实现aop,即通过动态代理来实现的,Aspect必须继承MethodBeforeAdvice,MethodAfterAdvice等<br> 2.Spring 2.0
    AOP需要改的是FBI 这个类，而且它也不需要再实现某些接口<br> 3.三使用标注（<a href="https://github.com/AspectJ" title="&#64;AspectJ"
                                                  class="at-link">@AspectJ</a>）实现AOP<br> AOP 和 OOP的区别：</p>
<pre><code>```html
 1. 面向方面编程 AOP 偏重业务处理过程的某个步骤或阶段，强调降低模块之间的耦合度，使代码拥有更好的移植性。
 2. 面向对象编程 (oop) 则是对业务分析中抽取的实体进行方法和属性的封装。
 ```
</code></pre>
<p>也可以说 AOP 是面向业务中的动词领域， OOP 面向名词领域。<br>AOP 的一个很重要的特点是源代码无关性，也就是说如果我们的系统中引用了 AOP
    组件，即使我们把该组件去掉，系统代码也应该能够编译通过。要实现这一点，可以使用动态 proxy 模式。</p>
<h4 id="h4--jdbc-"><a name="三、jdbc桥接模式" class="reference-link"></a><span
        class="header-link octicon octicon-link"></span>三、jdbc桥接模式</h4>
<p>桥接模式：<br>定义 ：将抽象部分与它的实现部分分离，使它们都可以独立地变化。<br>意图 ：将抽象与实现解耦。<br>桥接模式所涉及的角色</p>
<ol>
    <li>Abstraction ：定义抽象接口，拥有一个Implementor类型的对象引用</li>
    <li>RefinedAbstraction ：扩展Abstraction中的接口定义</li>
    <li>Implementor
        ：是具体实现的接口，Implementor和RefinedAbstraction接口并不一定完全一致，实际上这两个接口可以完全不一样Implementor提供具体操作方法，而Abstraction提供更高层次的调用
    </li>
    <li>ConcreteImplementor ：实现Implementor接口，给出具体实现<br>Jdk中的桥接模式：JDBC<br>JDBC连接 数据库
        的时候，在各个数据库之间进行切换，基本不需要动太多的代码，甚至丝毫不动，原因就是JDBC提供了统一接口，每个数据库提供各自的实现，用一个叫做数据库驱动的程序来桥接就行了<h4 id="h4--"><a
                name="四、抽象类" class="reference-link"></a><span class="header-link octicon octicon-link"></span>四、抽象类</h4>
        抽象类和普通类有三点区别：<br>1）抽象方法必须为public和protected（因为如果为private，则不能被子类继承，子类便无法实现该方法），缺省情况下默认为public。<br>2）抽象类不能用来创建对象，但是它可以有构造方法，用来帮助子类实例化。<br>3）如果一个类继承于一个抽象类，则子类必须实现父类的抽象方法。如果子类没有实现父类的抽象方法，则必须将子类也定义为abstract类。
        <h4 id="h4--"><a name="五、接口" class="reference-link"></a><span class="header-link octicon octicon-link"></span>五、接口
        </h4>接口的主要特点<br>1）接口中的成员变量默认都是public、static、final类型的，必须被显示初始化。<br>2）接口中的方法默认都是public、abstract类型的。<br>3）接口中只能包含public、static、final类型的成员变量和public、abstract类型的成员方法。<br>4）接口没有构造方法，不能被实例化。<br>5）一个接口不能实现另一个接口，但它可以继承多个其他接口。<br>6）接口必须通过类来实现它的抽象方法。<br>7）与子类继承抽象父类相似，当类实现了某个接口时，它必须实现接口中所有的抽象方法，否则这个类必须被定义为抽象类。<br>8）一个类只能继承一个直接的父类，但能实现多个接口。
        <h4 id="h4--"><a name="六、抽象类和接口的区别" class="reference-link"></a><span
                class="header-link octicon octicon-link"></span>六、抽象类和接口的区别</h4>1）抽象类可以提供成员方法的实现细节，而接口中只能存在public
        abstract方法；<br>2）抽象类中的成员变量可以是各种类型的，而接口中的成员变量只能是public static final类型的；<br>3）接口中不能含有静态代码块以及静态方法，而抽象类尅有静态代码块和静态方法；<br>4）一个类只能继承一个抽象类，而一个类却可以实现多个接口。<br>5）抽象类中的方法子类必须全部实现，不然子类也是抽象类，而接口中的抽象方法子类必须全部实现，是可选择实现的。<br>6）抽象类是一种模板设计模式，而接口时一种行为规范。
    </li>
</ol>
, , 2017-03-02 14:10:48.48, 1

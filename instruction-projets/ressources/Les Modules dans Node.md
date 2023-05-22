# Les Modules

Dans Node.js, on appelle **module** un fichier JavaScript `.js` ou `.mjs`.

Chaque module a son propre contexte et ne partage pas son état avec le reste du programme, contrairement au web ou tout est placé dans l’espace global :

```html
<script src="jquery.min.js" defer></script>
<script src="flexslider.min.js" defer></script>
<script>
  $('.slider').flexSlider();

  /*
    Possible car la fonction '$' de jQuery et la méthode '.flexSlider()'
    sont rendues disponibles dans l'objet global 'window', respectivement par
    les fichiers "jquery.min.js" et "flexslider.min.js"
  */
</script>
```

Dans Node.js, tout ce qui se passe à l'intérieur du module (déclaration de variables, fonctions, classes, …) est _uniquement accessible dans ce module_. La seule façon de partager des éléments est de **les exporter**, afin de pouvoir les **importer** depuis un autre module :

![](./images/modules/import-export.png)

---

Les modules permettent une meilleure organisation de l’application JavaScript en découpant les fonctionnalités du programme en plusieurs fichiers distincts.

## CommonJS ou ES Modules ?

Un module étant un fichier pouvant importer et/ou exporter des éléments, il faut une syntaxe JavaScript permettant de faire cela.

#### CommonJS

Par défaut et depuis sa création, Node.js supporte la syntaxe définie par le standard **CommonJS** (abrégé **CJS**).

CJS enveloppe par défaut le contenu de chaque module `.js` dans une fonction :

```javascript
// (function (exports, require, module, __filename, __dirname) {

let count = 0;

function incrementCount(c) {
  count += c;
}

function getCount() {
  return count;
}

// })
```

> Cette fonction `(function (exports, require, module, __filename, __dirname)` est un wrapper ajouté automatiquement par Node pour chaque module. Il est donc inutile de l'écrire.
> Si vous souhaitez en savoir plus, [voici un article sur le sujet](https://blog.logrocket.com/es-modules-in-node-today/#commonjsmodulesystem).

Afin que ce module fournisse une valeur d'export, il faut définir explicitement l'objet `exports` à Node.

On utilise généralement l'instruction `module.exports = /* valeur à exporter … */` pour ça.

```javascript
let count = 0;

function incrementCount(c) {
  count += c;
}

function getCount() {
  return count;
}

module.exports = { getCount, incrementCount };
```

En admettant que le fichier ci-dessus se nomme `countModule.js`, on pourrait alors dans un autre module indépendant récupérer l'export de `countModule.js` avec la fonction `require()`, fournie par Node :

```javascript
const countModule = require('./countModule');
// Notez l'importance du "./" devant le nom du module ! (L'extension ".js" elle est facultative.)

countModule.getCount(); // 0
countModule.incrementCount(40);
countModule.incrementCount(2);
countModule.getCount(); // 42
```

#### ES Modules

Node.js a introduit à partir de la `v8.5.0` le support expérimental des modules ECMAScript : les **ES Modules** (abrégé **ESM**). Il fallait alors utiliser le flag `--experimental-modules` avec la commande `node` : `node app.js --experimental-modules`.

Depuis la `v13.2.0`, le support est considéré comme stable et ne nécessite aucun flag.

_Cependant_ pour des raisons techniques internes liées à la façon dont sont chargés les modules en mémoire, il y a 2 possibilités distinctes pour pouvoir utiliser les modules ESM dans Node.js :

1. Soit utiliser l'extension `.mjs` (au lieu de `.js`)
2. Soit définir l'option `{ "type" : "module" }` dans le fichier `package.json` à la racine du projet.

On préfèrera pour ce cours la seconde option.

Nous pouvons donc utiliser les marqueurs `import` et `export` tels que définis par le standard ECMAScript dans les modules Node :

```js
// package.json
{
  "type" : "module"
}
```

```javascript
// countModule.js

let count = 0;

export function incrementCount(c) {
  count += c;
}

export function getCount() {
  return count;
}
```

```javascript
// index.js

import { incrementCount, getCount } from './countModule.js';
// L'extension ".js" en revanche redevient obligatoire !

getCount(); // 0
incrementCount(40);
incrementCount(2);
getCount(); // 42
```

---

Aujourd'hui, il est donc possible de choisir 2 stratégies de chargement de modules au sein d'une app Node.js (_CommonJS_ ou _ES Modules_).

_ESM_ ne rend pas pour autant _CJS_ obsolète. Même si la syntaxe des _ESM_ est plus moderne et plus agréable à utiliser, [elle ne fait pas l'unanimité](https://gist.github.com/joepie91/bca2fda868c1e8b2c2caf76af7dfcad3). De plus, les packages publiés sur la base de registre NPM ne sont pas toujours compatibles _ESM_.

Libre à vous de choisir donc le style de modules utilisés dans votre app Node.js.

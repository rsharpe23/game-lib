// Диначеская загрузка лучше тем, что позволяет загружать ресурсы 
// постепенно, например сначала для начальной сцены, затем для игровой и т.д.
// Если собрать статический бандл (шейдеры, текстуры, модели), то его нужно 
// будет подгружать целиком, что приведет к долгой начальной загрузке.

const loadResource = async (path, type) => {
  const res = await fetch(path);
  return res[type]();
};

export const loadText = path => loadResource(path, 'text');
export const loadJson = path => loadResource(path, 'json');
export const loadBuffer = path => loadResource(path, 'arrayBuffer');

// Создание картинки это асинхронный процесс, 
// даже если в src указывать уже подгруженный blob
export const loadImage = path => {
  return new Promise(resolve => {
    const img = Image.from(path);
    img.onload = () => void resolve(img);
  });
};
import {RouteRecordRaw} from "vue-router";

/**
 * 构建样例树结构
 * @param routes
 */
const examplesHandler = (routes: RouteRecordRaw[]): Route => {
    const examplesTree: Route = {
        name: '',
        path:'',
        children: []
    };

    // 用于快速查找已经创建的节点
    const nodesMap = new Map<string, Route>();

    // 遍历所有路由，并构建树
    routes.forEach(route => {
        if (!route.path.startsWith('/examples/')) {
            return; // 忽略非 /examples/ 下的路由
        }

        // 分割路径以获取层级
        const parts = route.path.split('/');
        parts.shift(); // 移除空字符串或初始的'/'

        // 遍历每个层级并创建节点（如果尚未创建）
        let currentNode = examplesTree;
        for (let i = 0; i < parts.length - 1; i++) {
            const nodeName = parts[i];

            // 如果当前层级节点尚未在 map 中，则添加到树中
            if (!nodesMap.has(nodeName)) {
                const newNode: Route = {
                    name: nodeName,
                    path:'',
                    children: []
                };
                currentNode.children?.push(newNode);
                nodesMap.set(nodeName, newNode);
                currentNode = newNode;
            } else {
                currentNode = nodesMap.get(nodeName)!; // 获取已存在的节点
            }
        }

        // 最后一个部分是叶子节点，添加其路径和名称（不添加其他属性）
        const leafName = parts[parts.length - 1]
        currentNode.children?.push({
            path: route.path,
            name: leafName
        });
    });
    return examplesTree;
}

export {examplesHandler}

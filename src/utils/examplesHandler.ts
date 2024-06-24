import {RouteRecordRaw} from "vue-router";
import {generateUUID} from "@/utils/common.ts";

/**
 * 根据name属性排序：01... 02...
 * @param children
 */
const sortChildrenByName = (children: Route[]): Route[] => {
    return children.sort((a, b) => {
        // 使用正则表达式从 name 中提取数字前缀
        const prefixA = parseInt(a.name.match(/^\d+/)?.[0] ?? '0', 10);
        const prefixB = parseInt(b.name.match(/^\d+/)?.[0] ?? '0', 10);

        // 如果前缀相同，则按字母顺序排序
        if (prefixA === prefixB) {
            return a.name.localeCompare(b.name);
        }

        // 按数字前缀排序
        return prefixA - prefixB;
    });
}
/**
 * 构建样例树结构
 * @param routes
 */
const examplesHandler = (routes: RouteRecordRaw[]): Route => {
    const examplesTree: Route = {
        id:"",
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
                    id:generateUUID(),
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

        // 在添加到 children 之前，检查当前节点的 children 是否已经排序
        if (currentNode.children) {
            currentNode.children = sortChildrenByName(currentNode.children);
        }

        currentNode.children?.push({
            id:generateUUID(),
            path: route.path,
            name: leafName
        });
    });

    // 对整个树进行递归排序
    function sortTree(node: Route) {
        if (node.children) {
            node.children = sortChildrenByName(node.children);
            node.children.forEach(child => sortTree(child));
        }
    }
    sortTree(examplesTree);

    return examplesTree;
}

export {examplesHandler}

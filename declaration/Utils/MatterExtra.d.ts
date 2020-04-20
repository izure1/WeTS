import Matter from 'matter-js';
declare class Vertices {
    /**
     *
     * @param width     가로 너비입니다.
     * @param height    세로 높이입니다.
     * @param object    기준이 될 오브젝트입니다.
     * @description     기준이 될 오브젝트를 중심으로 주어진 수치의 크기의 새로운 사각형의 벡터값을 만들어 반환합니다.
     */
    static rectangle(width: number, height: number, object: Matter.Body): Matter.Vector[];
}
declare class Body {
    /**
     *
     * @param width     가로 너비입니다.
     * @param height    세로 높이입니다.
     * @param object    변경될 오브젝트입니다.
     * @description     변경될 오브젝트를 주어진 수치의 크기로 수정합니다.
     */
    static changeSize(width: number, height: number, object: Matter.Body): void;
}
export { Vertices, Body };

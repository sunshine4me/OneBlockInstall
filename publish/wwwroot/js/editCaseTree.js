var editCaseTreeModel = function (option) {
    var _defOption = {
        caseTree: '#caseViewTree', spaceSelect: "#spaceID", spaceStepTree: '#spaceStepTree', editModal: "#editModal",
        stepIocnCls: "fa fa-cube", attrIocnCls: "fa fa-wrench", blockIocnCls: "fa fa-cubes",
    };
    $.extend(_defOption, option);
    function caseViewTreeOption() {
        return {
            animate: true,
            dnd: true,
            dragPoint: ["top", "top", "bottom", "bottom"],
            formatter: function (node) {
                if (node.key === undefined) {
                    if (node.newStep === true)
                        return "<span class='newStep'>" + node.name + " : " + node.describe + "</span>";
                    else
                        return node.name + " : " + node.describe;
                }
                else
                    return node.key + " : <span style='color:blue'>" + node.value + "</span>";

            },
            //只有根节点才允许拖拽
            onBeforeDrag: function (node) {
                //delete node.newStep;
                if ($(this).tree("getParent", node.target)) 
                    return false;
            },
            //只能拖拽到自己的根节点下
            onDragOver: function (target, source) {
                if ($(this).tree("getParent", target))
                    return false;

            },
            onBeforeDrop: function (target, source, point) {
                if (source.newStep) {
                    var node = formatToTreeData(source);
                    node.newStep = true;
                    if (point === "top") {
                        $(this).tree('insert', {
                            before: target,
                            data: node
                        });
                    } else {
                        $(this).tree('insert', {
                            after: target,
                            data: node
                        });
                    }

                    return false;
                }
            },
            onDblClick: stepEdit
        };

    }


    function changeSpace() {
        var id = $(_defOption.spaceSelect).val();
        $.get("/Step/steps/" + id, function (result) {
            var caseTree = $(_defOption.caseTree);
            //属于这个框架的元素高亮显示
            var selectNode = caseTree.tree("getSelected");
            var rootNode = caseTree.tree("getRoots");
            for (var i = 0; i < rootNode.length; i++) {
                if (rootNode[i].spaceID !== id) {
                    $(rootNode[i].target).addClass("grey");
                } else
                    $(rootNode[i].target).removeClass("grey");

            }


            for (var i = 0; i < result.length; i++) {
                if (result[i].blockID)
                    result[i].iconCls = _defOption.blockIocnCls;
                else
                    result[i].iconCls = _defOption.stepIocnCls;
            }
            $(_defOption.spaceStepTree).tree({
                data: result,
                dnd: true,
                formatter: function (node) {
                    return node.name + " : " + node.describe;
                },
                onDragOver: function (target, source) {
                    return false;
                },
                onBeforeDrag: function (node) {
                    if (node.children !== undefined)
                        return false;
                    else {
                        $(this).tree("select", node.target);
                        node["newStep"] = true;
                    }
                }
            });
        });

    };

    function stepEdit(node) {
        delete node.newStep;
        if (node.key) {
            node = $(_defOption.caseTree).tree("getParent", node.target);
            $(_defOption.caseTree).tree("select", node.target);
        }
        var postData = SerializeStepNode(node);
        $("#editModal .modal-content").empty();
        $.ajax({
            url: "/step/edit",
            type: 'POST',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            success: function (data) {
                $("#editModal .modal-content").html(data);
                $.parser.parse($("#editModal .modal-content"));
                $("#editModal button.submit").click(editStep);
                $('#editModal').modal('show');
            }
        });
    };

    //将服务器对象转为 可用的tree对象
    function formatToTreeData(source) {
        var resultData = { spaceID: source.spaceID + "", blockID: source.blockID + "", name: source.name + "", describe: source.describe + "", state: "closed", iconCls: _defOption.stepIocnCls };
        if (source.blockID)
            resultData.iconCls = _defOption.blockIocnCls;

        resultData.children = [];
        for (var attr in source.attrs) {
            var ve = source.attrs[attr] ? source.attrs[attr] : "";
            if (ve !== "")
                resultData.children.push({ key: attr, value: ve, iconCls: _defOption.attrIocnCls });
        }
        return resultData;
    }


    //序列化node对象用于提交
    function SerializeStepNode(node) {

        var step = {};
        var attrs = {};
        for (var c in node.children) {
            var child = node.children[c];
            attrs[child.key] = child.value;
        }
        step.describe = node.describe;
        step.attrs = attrs;
        step.spaceID = node.spaceID;
        step.blockID = node.blockID;
        step.name = node.name;
        return step
    }

    //序列化testCase对象用于提交
    function SerializeTestCase(nodes) {

        var steps = [];
        for (var i = 0; i < nodes.length; i++) {
            var step = SerializeStepNode(nodes[i]);
            steps.push(step);
        }
        var testCase = { steps: steps };

        return testCase;
    }

    //序列化bulid参数对象用于提交
    function SerializeBuildForm(BuildForm) {

        var submitData = {};
        submitData.blockName = $(BuildForm).find("input.blockName").val();

        var attrs = {};
        $(BuildForm).find("input.attr").each(function () {
            var key = $(this).data("key");
            var value = $(this).val();
            attrs[key] = value;
        })
        submitData.attrs = attrs;
        return submitData;
    }
    //编辑步骤-提交修改
    function editStep() {

        var caseTree = $(_defOption.caseTree);

        var selectNode = caseTree.tree("getSelected");
        var stepdesc = $('#stepDescribeEdit').val();


        caseTree.tree('update', {
            target: selectNode.target,
            describe: stepdesc
        });


        var Childrens = caseTree.tree("getChildren", selectNode.target);


        $(Childrens).each(function () {
            caseTree.tree("remove", this.target);
        })

        chData = [];
        $(_defOption.editModal + " input[name]").each(function () {
            //空值不显示
            if (this.value === "") return;
            var p = {};
            p["key"] = this.name;
            p["value"] = this.value;
            p["state"] = "open";
            p["iconCls"] = _defOption.attrIocnCls;
            chData.push(p);
        })

        caseTree.tree('append', {
            parent: selectNode.target,
            data: chData
        });

        $(_defOption.editModal).modal("hide");
    }


    return {
        changeSpace: changeSpace,
        stepEdit: stepEdit,
        SerializeStepNode: SerializeStepNode,
        editStep: editStep,
        caseViewTreeOption: caseViewTreeOption,
        formatToTreeData: formatToTreeData,
        SerializeTestCase: SerializeTestCase,
        SerializeBuildForm: SerializeBuildForm
    };
};
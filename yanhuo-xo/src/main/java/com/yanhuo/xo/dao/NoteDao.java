package com.yanhuo.xo.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yanhuo.xo.entity.Note;
import com.yanhuo.xo.vo.NoteVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author xiaozhao
 */
@Mapper
public interface NoteDao extends BaseMapper<Note> {
    @Select("SELECT * FROM t_note WHERE city = #{city}")
    List<NoteVo> selectByName(String city);
}

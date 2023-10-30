using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Task.Controllers;

[ApiController, Route("inputCommands")] 
public class InputCommandsController : Controller
{
    private readonly InputCommandContext _context;

    public InputCommandsController(InputCommandContext context)
    {
        _context = context;
    }

    [HttpGet("getHistory")]
    public Task<List<InputCommand>> GetCommandHistory()
    {
        return _context.Commands.ToListAsync();
    }
    
    [HttpPost("toExecute")]
    public async Task<string> PostCommandToProcess([FromBody] string input)
    { 
        var itemToDataBase = new InputCommand { Input = input};
        _context.Commands.Add(itemToDataBase);
        await _context.SaveChangesAsync();
        var output = await ProcessToExecute.RunСommandAsync(input);
        return output;
    }
}
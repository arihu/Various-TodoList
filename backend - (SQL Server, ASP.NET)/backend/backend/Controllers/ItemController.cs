using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemContext _dbContext;

        public ItemController(ItemContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            if (_dbContext.Items == null)
            {
                return NotFound();
            }
            return await _dbContext.Items.ToListAsync();

        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Item>>> PostItem(Item item)
        {
            _dbContext.Items.Add(item);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItems), new { id = item.ID }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if(id != item.ID)
            {
                return BadRequest();
            }
            _dbContext.Entry(item).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();

        }

        private bool ItemAvailable(int id)
        {
            return (_dbContext.Items?.Any(x => x.ID == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            if(_dbContext.Items == null)
            {
                return NotFound();
            }
            var item  = await _dbContext.Items.FindAsync(id);
            if(item == null)
            {
                return NotFound();
            }

            _dbContext.Items.Remove(item);
            await _dbContext.SaveChangesAsync();
            return Ok();

        }

    }
}

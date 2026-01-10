import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';

// GET /api/todos - Get all todos
export async function GET() {
  try {
    const todos = await dbHelpers.getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Todo text is required' },
        { status: 400 }
      );
    }

    const newTodo = await dbHelpers.addTodo({
      text: text.trim(),
      completed: false,
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
